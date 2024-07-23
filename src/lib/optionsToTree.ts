import type { Option, Menu } from "./CustomTypes";

export function optionsToTree(options: Option[]): Menu[] {
  const menu = [];
  for (const option of options) {
    const menuIndex = menu.findIndex((m) => m.id === option.menu_id);
    if (menuIndex === -1) {
      menu.push({
        name: option.menu_name,
        id: option.menu_id,
        options: [
          {
            name: option.name,
            id: option.id,
          },
        ],
      });
    } else {
      menu[menuIndex].options.push({
        name: option.name,
        id: option.id,
      });
    }
  }
  return menu;
}