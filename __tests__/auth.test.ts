import {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
} from "@/lib/auth";

describe("Auth functions", () => {
  test("hashPassword should hash a password", async () => {
    const password = "hello123";
    const hashed = await hashPassword(password);
    expect(hashed).not.toBe(password);
    expect(hashed).toContain("$2b$");
  });

  test("comparePassword should return true for correct password", async () => {
    const password = "hello123";
    const hashed = await hashPassword(password);
    const result = await comparePassword(password, hashed);
    expect(result).toBe(true);
  });

  test("comparePassword should return false for wrong password", async () => {
    const password = "hello123";
    const hashed = await hashPassword(password);
    const result = await comparePassword("wrongpassword", hashed);
    expect(result).toBe(false);
  });

  test("createToken should create a JWT token", () => {
    const token = createToken("user123", "DEVELOPER");
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  test("verifyToken should verify a valid token", () => {
    const token = createToken("user123", "DEVELOPER");
    const decoded = verifyToken(token) as { userId: string; role: string };
    expect(decoded.userId).toBe("user123");
    expect(decoded.role).toBe("DEVELOPER");
  });
});
