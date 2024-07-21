import { reactive } from "vue";


export const currentUserStore = reactive({
  first_name: "",
  last_name: "",
  email: "",
  id: 0,
  role: ""
})