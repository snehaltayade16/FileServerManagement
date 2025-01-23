<script setup>
    // Import Images
    import Header_Logo from '../assets/zygal_logo.png';
    import profileimage from '../assets/profileimage.png';
    import document from '../assets/document.png';
    import documentblue from '../assets/documentblue.png';
    import logs from '../assets/logs.png';
    import logsblue from '../assets/logsblue.png';
    import upload from '../assets/upload.png';
    import uploadblue from '../assets/uploadblue.png';
    import logout from '../assets/switch.png';
    import { myStorage } from '../utils/customStorage';
    import profileLogout from '../assets/logout.png'
    import user from '../assets/user.png'
</script>

<template>
    <div class="absolute inset-0 overflow-hidden bg-gray-100">
        <el-container class="h-full w-full">
            <el-header class="!h-20 w-full flex justify-between items-center">
                <img :src="Header_Logo" class="h-12"/>
                <div class="h-full w-fit flex items-center">
                    <div class="flex flex-col items-end">
                        <p class="text-md text-zinc-900 font-semibold leading-5 capitalize">{{userName}}</p>
                        <p class="text-sm text-zinc-500 font-normal capitalize">{{userType}}</p>
                    </div>
                    <!-- profile pop  -->
                    <el-popover  placement="top-start":width="300"  trigger="hover">
                            <div class="!h-full !w-full !flex items-center">
                                <div class="h-14 aspect-square p-2 rounded-full bg-zinc-300" >
                                    <img :src="profileimage" class="h-full" />
                                </div>
                                <div class="flex !flex-col ml-2.5">
                                    <p class="text-base text-zinc-600 font-normal capitalize">{{ userName }}</p>
                                    <p class="text-sm font-normal capitalize text-sky-600 cursor-pointer hover:!underline">View profile</p>
                                </div>
                            </div>
                            <el-divider class="m-!24px"/>
                            <div class="flex items-center !pb-2">
                                <img :src="profileLogout" class="h-full" />
                                <p class="text-red-600 ml-2.5 cursor-pointer "  @click="logOutDialogue(0)">Logout</p>
                            </div>
                        <template #reference>
                            <div class="h-14 aspect-square p-2  ml-2.5 rounded-full bg-zinc-300" >
                                <img :src="profileimage" class="h-full" />
                            </div>
                        </template>
                    </el-popover>
                    <!--  -->
                </div>
            </el-header>
            <el-main class="h-full w-full !p-2.5 overflow-hidden">
                <el-container class="h-full w-full">
                    <el-aside class="h-full mr-2.5 p-2.5 !w-52 bg-white border-t border-l border-gray-200 rounded shadow-xl">
                        <div v-for="(item, index) in menu" class="h-10 px-2.5 mb-3 w-full flex items-center rounded overflow-hidden cursor-pointer" :class="item.isActive ? 'bg-[#ECF5FF] text-[#409EFF]' : 'bg-transparent text-[#606266]'" @click="menuHandler(item);">
                            <img :src="item.isActive ? item.activeIcon : item.icon" class="h-4 mr-2.5"/>
                            <p class="text-md font-semibold">{{ item.title }}</p>
                        </div>
                    </el-aside>
                    <el-main class="h-full !p-0 bg-white border-t border-l border-gray-200 rounded shadow-xl">
                        <el-row class="h-full w-full flex items-start justify-center">
                            <router-view v-slot="{ Component, route }">
                                <transition :enter-active-class="route.meta.enterClass" :leave-active-class="route.meta.leaveClass">
                                    <component :is="Component" />
                                </transition>
                            </router-view>
                        </el-row>
                    </el-main>
                </el-container>
            </el-main>
            <el-dialog title="Ready to Leave?" v-model="logoutDialogVisible" width="30%">
                <main class="flex items-center justify-center flex-col">
                    <div class="w-full flex items-center justify-center flex-col">
                        <div class="h-20 w-20">
                            <img :src="logout" class="h-full w-full"/>
                        </div>
                            <p class="!text-lg !p-2.5">Are you leaving ?</p>
                        </div>
                    <div class="!flex items-center justify-center pb-5">
                        <p class="!text-base">are you want to logout? All your unsaved data will be lost.</p>
                    </div>
                </main>
                <footer class="dialog-footer !flex items-end justify-end">
                    <el-button type="primary" @click="logoutDialogVisible = false">Cancel</el-button>
                    <el-button type="danger"  @click="logOutDialogue(1)">logout</el-button>
                </footer>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
import requestMixin from '../mixins/requestMixin.js'
export default {
mixins:[requestMixin],
    data() {
        return {
            queryData: {},
            menu: [
                {
                    id: "upload",
                    title: "Upload",
                    route: "uploadform",
                    activeIcon: uploadblue,
                    icon: upload,
                    isActive: true
                },
                {
                    id: "logs",
                    title: "Logs",
                    route: "logs",
                    activeIcon: logsblue,
                    icon: logs,
                    isActive: false
                },
                {
                    id: "documents",
                    title: "Documents",
                    route: "documents",
                    activeIcon: documentblue,
                    icon: document,
                    isActive: false
                },
            ],
            SelectProject:[],
            logoutDialogVisible:false,
            userType:'',
            userName:myStorage.getItem('userName')
        }
    },
    mounted() {
        this.menuHandler(this.menu[0]);
        this.config()
    },
    methods: {
        menuHandler(item) {
            this.menu.forEach((el) => el.isActive = false);
            item.isActive = true;
            this.redirectPage(item.route, {});
        },
        config() {;
            let res = {
                "code": 200,
                "data": {
                    "config": {
                        "admin": {
                            "title": "Admin",
                            "identity": "admin",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/admin/"
                        },
                        "adminV2": {
                            "title": "AdminV2",
                            "identity": "adminV2",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/"
                        },
                        "adminV3": {
                            "title": "AdminV3",
                            "identity": "adminV3",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV3/"
                        },
                        "agents": {
                            "title": "Agents",
                            "identity": "agents",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/agents/"
                        },
                        "agentsAIV2": {
                            "title": "AgentsAIV2",
                            "identity": "agentsAIV2",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/agentsAIV2/"
                        },
                        "agentsAIV5": {
                            "title": "AgentsAIV5",
                            "identity": "agentsAIV5",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/agentsAIV5/"
                        },
                        "agentsAIV6": {
                            "title": "AgentsAIV6",
                            "identity": "agentsAIV6",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/agentsAIV6/"
                        },
                        "agentsAIV7": {
                            "title": "AgentsAIV7",
                            "identity": "agentsAIV7",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/agentsAIV7/"
                        },
                        "app": {
                            "title": "New Mobile App",
                            "identity": "app",
                            "baseUrl": "/var/www/html/platform_dev_git/zygal/platform/app/"
                        }
                    },
                    "access": [
                        "admin",
                        "adminV2",
                        "adminV3",
                        "agents",
                        "agentsAIV2",
                        "agentsAIV5",
                        "agentsAIV6",
                        "agentsAIV7",
                        "app"
                    ],
                    "userType": "admin"
                }
            }
            if(res.code == 200){
                this.userType=res.data.userType
                // if(res.data.hasOwnProperty('access') && res.data.access.length > 0) {
                //     if(res.data.hasOwnProperty('config')) {
                //         for(var i in res.data.access) {
                //             for(var j in Object.keys(res.data.config)) {
                //                 if(res.data.access[i]==Object.keys(res.data.config)[j]) {
                //                     this.projects.push({
                //                         baseUrl: res.data.config[res.data.access[i]]['baseUrl'],
                //                         title: res.data.config[res.data.access[i]]['title'],
                //                         identity: res.data.config[res.data.access[i]]['identity']
                //                     });
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        },
        logOutDialogue(type){
        if(type==0)
        {
            this.logoutDialogVisible=true
        }
        else if(type==1)
        {

            let res={
                "code":200
            }
            //console.log("-->", res);
            if(res.code == 200){
                this.$notify({title: 'Success', message: 'Logout Sucessfully',type: 'success' });
                this.redirectPage('Login');
            }
            else{
                this.$notify({title: 'Error', message: 'Something went wrong',type: 'error' });
            }
            
        }
            
        },
        redirectPage(name = '', query = {}) {
            this.$router.push({
                name: name,
                query: query
            });
        },
    },
};
</script>