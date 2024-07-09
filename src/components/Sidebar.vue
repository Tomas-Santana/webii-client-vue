<script>
export default {
  methods: {
    navigateToCalculator() {
      this.$router.push('/calculator');
    },
    navigateToMembers() {
      this.$router.push('/miembros');
    },
    navigateToPrincipals() {
      this.$router.push('/principal');
    },
    navigateToActividades() {
      this.$router.push('/actividades');
    },
    navigateToTime() {
      this.$router.push('/tiempo');
    },
    navigateToProject() {
      this.$router.push('/proyecto');
    } 
  }
}

</script>


<template>
    <!-- Sidebar -->
    <div class="w-[390px] h-full bg-white drop-shadow-md">
        <!-- Header Sidebar -->
        <div class="flex items-center h-[95px] bg-white font-black text-2xl p-8">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="44" height="44" fill="url(#pattern0_6_12)"/>
                <defs>
                    <pattern id="pattern0_6_12" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_6_12" transform="scale(0.00208333)"/>
                    </pattern>
                    <image id="image0_6_12" width="480" height="480" xlink:href="data:image/png;base64,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"/>
                </defs>
            </svg>
            RTS MANAGER
        </div>
        <!-- SideContent -->
        <div class="h-[calc(100vh-95px)] bg-white">
            <!-- Submenu -->
            <div class="flex flex-col space-y-[10px] items-center">
                <div @click="navigateToPrincipals" role="button" tabindex="0" class="flex items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div class="grid place-items-center mr-4">
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.75 5.25C10.375 2.78282 12.7356 1.52305 17.875 1.5C17.9572 1.49969 18.0386 1.51565 18.1145 1.54695C18.1905 1.57825 18.2595 1.62427 18.3176 1.68237C18.3757 1.74047 18.4218 1.80949 18.4531 1.88546C18.4844 1.96143 18.5003 2.04284 18.5 2.125V13.375C18.5 13.5408 18.4342 13.6997 18.3169 13.8169C18.1997 13.9342 18.0408 14 17.875 14C12.875 14 10.9434 15.0082 9.75 16.5M9.75 5.25C9.125 2.78282 6.76446 1.52305 1.625 1.5C1.54284 1.49969 1.46143 1.51565 1.38546 1.54695C1.30949 1.57825 1.24047 1.62427 1.18237 1.68237C1.12427 1.74047 1.07825 1.80949 1.04695 1.88546C1.01565 1.96143 0.999695 2.04284 1 2.125V13.2996C1 13.6856 1.23907 14 1.625 14C6.625 14 8.56367 15.0156 9.75 16.5M9.75 5.25V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>Pagina principal
                </div>
                <div @click="navigateToProject" role="button" tabindex="0" class="flex items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div class="grid place-items-center mr-4">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg ">
                            <path d="M2.5 7.5V4.6875C2.5 4.2731 2.66462 3.87567 2.95765 3.58265C3.25067 3.28962 3.6481 3.125 4.0625 3.125H7.02695C7.33546 3.12501 7.63707 3.21635 7.89375 3.3875L8.98125 4.1125C9.23793 4.28365 9.53954 4.37499 9.84805 4.375H15.9375C16.3519 4.375 16.7493 4.53962 17.0424 4.83265C17.3354 5.12567 17.5 5.5231 17.5 5.9375V7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.7462 8.84961L18.1126 15.3125C18.1126 15.7264 17.9483 16.1234 17.6559 16.4164C17.3635 16.7093 16.9667 16.8743 16.5528 16.875H3.44733C3.03341 16.8743 2.63668 16.7093 2.34425 16.4164C2.05181 16.1234 1.88757 15.7264 1.88757 15.3125L1.25398 8.84961C1.24022 8.67761 1.26224 8.50462 1.31862 8.34154C1.37501 8.17846 1.46454 8.02882 1.5816 7.90204C1.69865 7.77526 1.84069 7.67409 1.99876 7.6049C2.15683 7.53571 2.32752 7.49999 2.50007 7.5H17.504C17.6762 7.50053 17.8465 7.53664 18.0041 7.60607C18.1617 7.6755 18.3032 7.77675 18.4199 7.90347C18.5365 8.03019 18.6257 8.17965 18.6818 8.34246C18.738 8.50527 18.7599 8.67793 18.7462 8.84961Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>Administrar proyectos
                </div>
                <div @click="navigateToCalculator" role="button" tabindex="0" class="flex items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div   class="grid place-items-center mr-4">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7031 6.5625C15.5886 8.15117 14.4101 9.375 13.1249 9.375C11.8398 9.375 10.6593 8.15156 10.5468 6.5625C10.4296 4.90977 11.5769 3.75 13.1249 3.75C14.673 3.75 15.8202 4.93984 15.7031 6.5625Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.1251 11.875C10.5794 11.875 8.13134 13.1395 7.51806 15.602C7.43681 15.9277 7.6411 16.25 7.97587 16.25H18.2747C18.6095 16.25 18.8126 15.9277 18.7325 15.602C18.1192 13.1 15.6712 11.875 13.1251 11.875Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
                            <path d="M7.81238 7.26328C7.72098 8.53203 6.76863 9.53125 5.74207 9.53125C4.71551 9.53125 3.7616 8.53242 3.67176 7.26328C3.5784 5.94336 4.50535 5 5.74207 5C6.97879 5 7.90574 5.96758 7.81238 7.26328Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.04677 11.9531C7.34169 11.6301 6.56513 11.5059 5.74208 11.5059C3.71083 11.5059 1.7538 12.5156 1.26357 14.4824C1.19911 14.7426 1.36239 15 1.62958 15H6.01552" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
                        </svg>
                    </div>
                    Administrar usuarios del sistema
                </div>
                <hr class="my-4 md:min-w-[360px]">
                <!-- Select -->
                <select name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[360px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled>nose</option>
                </select>
                 <!-- Submenu -->
                <div @click="navigateToMembers" role="button" tabindex="0" class="items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div class="grid place-items-center mr-4">
                    </div>Miembros
                </div>
                <div @click="navigateToActividades" role="button" tabindex="0" class="items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div class="grid place-items-center mr-4">
                    </div>Actividades
                </div>
                <div @click="navigateToTime" role="button" tabindex="0" class="items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div class="grid place-items-center mr-4">
                    </div>Hoja de tiempo
                </div>

                
            </div>
        </div>
    </div>
</template>