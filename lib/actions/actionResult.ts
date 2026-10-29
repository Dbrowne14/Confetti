export type ActionResult =
  | { success: true; error: null }
  | { success: false; error: string };
