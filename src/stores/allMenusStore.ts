import { reactive } from "vue";
import type { Menu } from "@/lib/CustomTypes";

export const allMenusStore = reactive<{
  allMenus: Menu[];
}>({
  allMenus: [],
});