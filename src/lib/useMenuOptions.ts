import type { OptionModuleType } from "./ModuleTypes";
import { moduleCaller } from "./ModuleCaller/ModuleCaller";
import { ref } from "vue";
import type { ProjectMenuName } from "./CustomTypes";
import type { ViewOptions } from "./MenuOptions";
import apiRoutes from "@/apiRoutes";
import { toast } from "vue-sonner";

export function useProjectMenuOptions<OptionsType extends string>(menuName: ProjectMenuName, projectId: number) {
  const options = ref<OptionsType[]>();
  const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, "OptionModule");

  const getOptions = async () => {
    const response = await OptionModule.OptionManager.getProjectMenuOptions(menuName, projectId);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    options.value = response.data as unknown as OptionsType[];
  }
  getOptions();
  if (!options.value) {}

  return { options };
}