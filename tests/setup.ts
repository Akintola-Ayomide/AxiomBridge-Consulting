import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// The server-only marker resolves to a throwing stub outside React Server
// Components. Route-handler tests run in plain Node, so stub it here.
vi.mock("server-only", () => ({}));
