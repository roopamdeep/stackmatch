import { render, screen } from "@testing-library/react";
import JobCard from "@/components/JobCard";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockJob = {
  id: "job123",
  title: "Frontend Developer",
  location: "Toronto, ON",
  salary: "$100,000",
  stack: ["React", "TypeScript", "Node.js"],
  company: {
    name: "Shopify",
  },
};

describe("JobCard component", () => {
  test("renders job title", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  test("renders company name", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Shopify/)).toBeInTheDocument();
  });

  test("renders location", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Toronto/)).toBeInTheDocument();
  });

  test("renders tech stack", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  test("renders View Job button", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("View Job")).toBeInTheDocument();
  });
});
