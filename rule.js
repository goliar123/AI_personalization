const companyRules = [
  {
    id: "rule_001",
    text: "Never use the 'any' type in TypeScript. Always use 'unknown' and perform proper type narrowing.",
    severity: "CRITICAL",
    category: "TypeScript"
  },
  {
    id: "rule_002",
    text: "All database operations must be wrapped in try/catch blocks with structured error logging.",
    severity: "HIGH",
    category: "Database"
  },
  {
    id: "rule_003",
    text: "API endpoints must validate all incoming request bodies using Zod schemas before processing.",
    severity: "HIGH",
    category: "Security"
  },
  {
    id: "rule_004",
    text: "Avoid using console.log in production code. Use a structured logger like Winston or Pino.",
    severity: "MEDIUM",
    category: "Logging"
  },
  {
    id: "rule_005",
    text: "Never commit API keys, secrets, or credentials to version control. Use environment variables.",
    severity: "CRITICAL",
    category: "Security"
  },
  {
    id: "rule_006",
    text: "All async functions must handle promise rejections explicitly. Do not use .catch() chains.",
    severity: "HIGH",
    category: "Error Handling"
  },
  {
    id: "rule_007",
    text: "Prefer const over let. Only use let when reassignment is absolutely necessary.",
    severity: "LOW",
    category: "Style"
  },
  {
    id: "rule_008",
    text: "Database queries must include proper indexing hints for frequently filtered columns.",
    severity: "MEDIUM",
    category: "Performance"
  }
];

export default companyRules