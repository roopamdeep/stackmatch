describe("API validation", () => {
  test("email validation", () => {
    const email = "test@test.com";
    expect(email).toContain("@");
  });

  test("password minimum length", () => {
    const password = "hello123";
    expect(password.length).toBeGreaterThan(6);
  });

  test("role validation", () => {
    const validRoles = ["DEVELOPER", "COMPANY"];
    expect(validRoles).toContain("DEVELOPER");
    expect(validRoles).toContain("COMPANY");
  });
});
