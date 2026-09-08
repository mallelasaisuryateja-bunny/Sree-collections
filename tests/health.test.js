import { describe,it,expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";
describe("health",()=>it("returns API status",async()=>{const r=await request(app).get("/api/health");expect(r.status).toBe(200);expect(r.body.success).toBe(true)}));
