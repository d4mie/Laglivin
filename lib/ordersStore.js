import { promises as fs } from "fs";
import path from "path";

function ordersDir() {
  return path.join(process.cwd(), "orders");
}

async function ensureOrdersDir() {
  await fs.mkdir(ordersDir(), { recursive: true });
}

function orderPath(reference) {
  return path.join(ordersDir(), `${reference}.json`);
}

export async function writeOrder(reference, data) {
  if (!reference) throw new Error("writeOrder: reference required");
  await ensureOrdersDir();
  await fs.writeFile(orderPath(reference), JSON.stringify(data, null, 2), "utf8");
}

export async function readOrder(reference) {
  const raw = await fs.readFile(orderPath(reference), "utf8");
  return JSON.parse(raw);
}

export async function upsertOrder(reference, patch) {
  if (!reference) throw new Error("upsertOrder: reference required");
  await ensureOrdersDir();
  let existing = null;
  try {
    existing = await readOrder(reference);
  } catch {
    existing = null;
  }
  const next = { ...(existing || {}), ...(patch || {}) };
  await writeOrder(reference, next);
  return next;
}

export async function listOrders() {
  await ensureOrdersDir();
  const files = await fs.readdir(ordersDir());
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const orders = [];
  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(path.join(ordersDir(), file), "utf8");
      orders.push(JSON.parse(raw));
    } catch {
      // ignore unreadable files
    }
  }
  // newest first
  orders.sort((a, b) => (b?.createdAt || "").localeCompare(a?.createdAt || ""));
  return orders;
}


