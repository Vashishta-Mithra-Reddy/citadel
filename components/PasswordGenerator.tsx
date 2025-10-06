"use client";
import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { passwordStrength } from "check-password-strength";
import { motion, Variants } from "framer-motion";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeSpecialChars: string[];
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<{ value: string }>({
    value: "Too weak",
  });

  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeSpecialChars: [],
  });

  useEffect(() => {
    generatePassword();
  }, [options]);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijkmnopqrstuvwxyz";
    const numberChars = "23456789";
    const symbolChars = "!@#$%^&*()_+=-[]{}|:;<>,.?/";
    const similarChars = "Il1O0";

    let validChars = "";
    if (options.includeUppercase) validChars += uppercaseChars;
    if (options.includeLowercase) validChars += lowercaseChars;
    if (options.includeNumbers) validChars += numberChars;
    if (options.includeSymbols) validChars += symbolChars;

    if (options.excludeSimilar) {
      for (const c of similarChars) {
        validChars = validChars.replace(c, "");
      }
    }

    if (options.excludeSpecialChars.length > 0) {
      options.excludeSpecialChars.forEach((c) => {
        validChars = validChars.replace(c, "");
      });
    }

    if (validChars.length === 0) {
      setOptions((prev) => ({ ...prev, includeLowercase: true }));
      validChars = lowercaseChars;
    }

    const randomValues = new Uint32Array(options.length);
    window.crypto.getRandomValues(randomValues);

    let newPwd = "";
    for (let i = 0; i < options.length; i++) {
      newPwd += validChars[randomValues[i] % validChars.length];
    }

    setPassword(newPwd);
    evaluateStrength(newPwd);
  };

  const evaluateStrength = (pwd: string) => {
    const result = passwordStrength(pwd);
    setStrength({ value: result.value });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 20000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleOptionChange = (
    key: keyof PasswordOptions,
    value: boolean | number | string[],
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const getColorForStrength = () => {
    switch (strength.value) {
      case "Strong":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Weak":
        return "bg-orange-500";
      case "Too weak":
      default:
        return "bg-red-500";
    }
  };

  const strengthWidth = () => {
    switch (strength.value) {
      case "Strong":
        return "100%";
      case "Medium":
        return "75%";
      case "Weak":
        return "50%";
      case "Too weak":
      default:
        return "25%";
    }
  };

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }, // smooth cubic bezier easing
    },
  });

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full md:w-4/6 mb-0"
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            key={password}
            initial={{ scale: 0.99 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="flex-1 bg-foreground/5 p-3 rounded-lg font-mono text-lg overflow-x-auto line-clamp-1"
          >
            {password}
          </motion.div>

          <button
            onClick={copyToClipboard}
            className="p-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 cursor-pointer active:scale-95"
            aria-label="Copy password"
          >
            {copied ? <Check size={24} /> : <Copy size={24} />}
          </button>
          <button
            onClick={generatePassword}
            className="p-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 cursor-pointer active:scale-95"
            aria-label="Generate new password"
          >
            <RefreshCw size={24} />
          </button>
        </div>

        {/* Strength bar */}
        <motion.div
          className="mt-2"
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full h-2 rounded-full bg-foreground/10 overflow-hidden">
            <div
              className={`h-full transition-all rounded-full duration-500 ${getColorForStrength()}`}
              style={{ width: strengthWidth() }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-foreground/70 transition-all duration-300">
            Strength:{" "}
            <span
              className={`font-medium ${
                strength.value === "Strong"
                  ? "text-green-500"
                  : strength.value === "Medium"
                    ? "text-yellow-500"
                    : strength.value === "Weak"
                      ? "text-orange-500"
                      : "text-red-500"
              } transition-all duration-300`}
            >
              {strength.value}
            </span>
          </p>
        </motion.div>

        <motion.div
          className="space-y-4 mt-4"
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
        >
          <div>
            <label className="flex justify-between mb-2">
              <span>Length: {options.length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={options.length}
              onChange={(e) =>
                handleOptionChange("length", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full md:w-4/6 my-4"
        variants={fadeUp(0.4)}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={() =>
            handleOptionChange("includeLowercase", !options.includeLowercase)
          }
          className={`p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
            options.includeLowercase
              ? "bg-foreground text-background font-medium"
              : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          <span>Lowercase (a-z)</span>
        </button>

        <button
          onClick={() =>
            handleOptionChange("includeUppercase", !options.includeUppercase)
          }
          className={`p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
            options.includeUppercase
              ? "bg-foreground text-background font-medium"
              : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          <span>Uppercase (A-Z)</span>
        </button>

        <button
          onClick={() =>
            handleOptionChange("includeNumbers", !options.includeNumbers)
          }
          className={`p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
            options.includeNumbers
              ? "bg-foreground text-background font-medium"
              : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          <span>Numbers (0-9)</span>
        </button>

        <button
          onClick={() =>
            handleOptionChange("includeSymbols", !options.includeSymbols)
          }
          className={`p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
            options.includeSymbols
              ? "bg-foreground text-background font-medium"
              : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          <span>Symbols (!@#$...)</span>
        </button>

        <button
          onClick={() =>
            handleOptionChange("excludeSimilar", !options.excludeSimilar)
          }
          className={`p-3 rounded-lg text-left transition-all duration-200 cursor-pointer col-span-2 md:col-span-1 ${
            options.excludeSimilar
              ? "bg-foreground text-background font-medium"
              : "bg-foreground/5 hover:bg-foreground/10"
          }`}
        >
          <span className="line-clamp-1">
            Exclude similar characters (I, l, 1, O, 0)
          </span>
        </button>

        <div className="col-span-2 md:col-span-1">
          <input
            type="text"
            value={options.excludeSpecialChars.join("")}
            onChange={(e) =>
              handleOptionChange(
                "excludeSpecialChars",
                e.target.value.split(""),
              )
            }
            className="w-full h-full rounded-lg p-3 border-1 border-foreground/20 bg-foreground/5 outline-none focus:border-foreground transition-all duration-300"
            placeholder="Enter to Exclude: e.g. !@#$%"
          />
        </div>
      </motion.div>
    </div>
  );
}
