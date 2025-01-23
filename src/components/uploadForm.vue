<script setup>
    // Import Images
    import folderIcon from '../assets/folder.png'
    import back from '../assets/left-arrow.png'
    import js from '../assets/js-file.png'
    import php from '../assets/php.png'
    import vue from '../assets/vue.png'
    import css from '../assets/css.png'
    import txt from '../assets/text.png'
    import image from '../assets/image.png'
    import html from '../assets/html.png'
    import vedio from '../assets/vlc-player.png'
    import json from '../assets/braces.png'
    import python from '../assets/python.png'
    import zip from '../assets/zip.png'
</script>

<template>
    <!-- HTML component -->
    <el-col :span="24" class="h-full p-2.5 !flex flex-col">
        <el-container class="h-full w-full">
            <!-- upload files form -->
            <el-header class="!h-fit !p-0">
                <el-form label-position="top" label-width="auto" ref="UploadProjectForm" :model="UploadProjectModel" :rules="UploadProjectRules">
                    <el-form-item label="Project Name" prop="selectProject" required>
                        <el-select placeholder="Enter project name" size="large" v-model="UploadProjectModel.selectProject" @change="selectProjects()" clearable>  
                                <el-option :value="items.baseUrl" :label="items.title" v-for="(items,index) in projects">{{ items.title }}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Module Name" prop="title" required>
                        <el-input placeholder="Enter project Title" size="large" v-model="UploadProjectModel.title"/>  
                    </el-form-item>
                    <el-form-item label="Description" prop="description" required>
                        <el-input type="textarea" placeholder="Enter Description" size="large" v-model="UploadProjectModel.description" ></el-input> 
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main class="!p-0">
                <el-row class="h-full w-full flex justify-between">
                    <el-col :span="12" class="h-full pr-[5px]">
                        <!-- files and folders section -->
                        <el-container class="h-full w-full border border-gray-200 rounded">
                            <el-header id="header" class="!p-2.5 !border-b !border-gray-200 !h-14 flex items-center">
                                <div  @click="BackBtn(UploadProjectModel.selectProject)" class="h-8 aspect-square p-2 mr-2.5 flex justify-center items-center cursor-pointer bg-zinc-100 rounded-full">
                                    <img :src="back" class="h-full" />
                                </div>
                                 <p class="text-md text-zinc-600 font-semibold overflow-x-auto" >fileName</p>
                                <!-- <p class="text-md text-zinc-600 font-semibold overflow-x-auto" v-if="folderParam != '' && backPress == 0 "> {{ folderParam }} </p>
                                <p class="text-md text-zinc-600 font-semibold overflow-x-auto" v-else-if="folderParam != '' && backPress == 1 "> {{ splitUrl}} </p>
                                <p class="text-md text-zinc-600 font-semibold" v-else> / </p> -->
                                <!-- <p class="text-md text-zinc-600 font-semibold">{{ previousFolder == '' ? UploadProjectModel.selectProject + files.folderFileName : UploadProjectModel.selectProject + previousFolder + '/' + files.folderFileName }}</p> -->
                            </el-header>
                            <el-main class="!p-2.5" v-if="folderName.length > 0">
                                <template v-for="(item, index) in folderName"  :key="index" class="flex items-center justify-between cursor-pointer">
                                    <div v-for="(files,index2) in item" class="flex items-center justify-between cursor-pointer">
                                        <div class="flex items-center justify-center">
                                            <img :src="getIconForFileType(files.folderFileName)" class="h-6"/>
                                            <p class="ml-1.5" @dblclick.prevent="files.folderFileName.includes('.php') || files.folderFileName.includes('.wepb') || files.folderFileName.includes('.log') || files.folderFileName.includes('.zip') || files.folderFileName.includes('.json') || files.folderFileName.includes('.html') || files.folderFileName.includes('.vue') || files.folderFileName.includes('.js') || files.folderFileName.includes('.css') || files.folderFileName.includes('.png') || files.folderFileName.includes('.jpeg') || files.folderFileName.includes('.jpg') || files.folderFileName.includes('.csv')  ? '': folderClick(files.folderFileName) ">{{ files.folderFileName }}</p>
                                        </div>
                                        <el-checkbox @change="handleCheckboxClick(files.folderFileName,previousFolder == '' ? UploadProjectModel.selectProject + files.folderFileName : UploadProjectModel.selectProject + previousFolder + '/' + files.folderFileName)" v-model="checkedItems[previousFolder == '' ? UploadProjectModel.selectProject + files.folderFileName : UploadProjectModel.selectProject + previousFolder + '/' + files.folderFileName]"></el-checkbox>
                                    </div>
                                </template>
                            </el-main>
                            <!-- no  files folder found section-->
                            <el-main class="!p-2.5 !flex !items-center !justify-center" v-if="folderName.length == 0" >
                                <p class="text-lg text-zinc-600 font-semibold">No files/folder found</p>
                            </el-main>
                        </el-container>
                    </el-col>
                    <!-- selected files and folders section -->
                    <el-col :span="12" class="h-full pl-[5px]">
                        <el-container class="h-full w-full border border-gray-200 rounded">
                            <el-header id="header" class="!p-2.5 !border-b !border-gray-200 !h-14 flex items-center">
                                <p class="text-md text-zinc-600 font-semibold">Selected files/folders</p>
                            </el-header>
                            <el-main class="!p-2.5"  v-if="selectedFolders.length > 0" >
                                <div  class="h-fit w-full mb-2 flex items-center justify-between"  v-for="(item, index) in selectedFolders"  :key="index" >
                                    <el-tooltip class="box-item" effect="dark" :content=item.selectedFilesUrl placement="top-start">
                                        <p class="text-sm text-zinc-500 font-normal" @contextmenu="handleRightClick()">
                                            {{ index + 1 }}. {{ item.selectedFiles }}
                                        </p>
                                    </el-tooltip>
                                </div>
                            </el-main>
                            <!-- no selected files section-->
                            <el-main  class="!p-2.5 !flex !items-center !justify-center" v-if="selectedFolders.length == 0" >
                                <p class="text-lg text-zinc-600 font-semibold">No selected files/folder found</p>
                            </el-main>
                        </el-container>
                    </el-col>
                </el-row>
            </el-main>
            <!-- submit button -->
            <el-footer class="!h-fit !p-0 mt-2.5 flex justify-end items-end">
                <el-button type="primary" @click="UploadProjectForm('UploadProjectForm')">Submit</el-button>
            </el-footer>
        </el-container>
    </el-col>
</template>

<script>
    export default {
    name:'UploadForm',
    data() {
        return {
        queryData: {},
        UploadProjectModel:{
            selectProject:'',
            title:'',
            description:''
        },
        UploadProjectRules:{
            selectProject:[
                {
                    required: true, message: 'Please Select Project', trigger: 'change' 
                },
            ]
        },
        selectProjectObj:[],
        // Folder and file structure
        admin:{
            pages: {
                viewer: ['page.php', 'app.js', { css: ['theme.css'] }],
            },
        },
        folderName: [],
        selectedFolders:[],
        projects:[],
        previousFolder:'',
        folderParam:'',
        splitUrl:'',
        checkedItems: {},
        backPress:''
        }
    },
    mounted() {
        this.selectProjectObj=this.$route.query
        this.fetchConfigData();
    },
    methods: {
        //route
        redirectPage(name = '', query = {}) {
            this.$router.push({
                name: name,
                query: query
            });
        },
        //fetch all project 
        selectProjects(){
            this.previousFolder='';
            this.folderParam='';
            this.selectedFolderArray=[];
            this.folderName=[];
            this.selectedFolders=[];
            this.checkedItems={};
            let param = {
                "modulePath":this.UploadProjectModel.selectProject,
            };
            // //console.log(param);
            let res = {
                "code": 200,
                "data": ["add_device", "backend", "config.php", "configure_azure.php", "css", "deleteMobileAppEmail.php", "get_all_link_device_old_status_to_new_collection.php", "get_ip.php", "get_video_storage_available_dates.php", "home.php", "iccc", "images", "include", "index.php", "index_bkup.php", "js", "login", "logout.php", "logs", "main.php", "marketing_portal", "navbar.php", "no_access_page.php", "notification.php", "pages", "phoenix", "sales_portal", "set_email_service", "sub_admin.php", "support_portal", "upload", "utility", "vendor"]
            }
            // //console.log("Selection Data",res);
            var temp=[]
            if(res.code == 200){
                this.showNoDataUi = false;
                for(var i in res.data) {
                    temp.push({
                        "folderFileName":res.data[i],
                        "isSelected":false
                    })
                }
                this.folderName.push(temp)
            }
        },
        // double click on folder
        folderClick(folderName){
            this.backPress = 0;
            if(this.checkedItems[folderName]==true){
                this.$notify({title: 'Error', message: 'If folder is selected you can not select a single files from this folder',type: 'error' });
                return;
            }

            this.previousFolder = this.previousFolder ? this.previousFolder + '/' + folderName : folderName;
            var param = {
                "modulePath": this.previousFolder === '' ? this.UploadProjectModel.selectProject + folderName : this.UploadProjectModel.selectProject + this.previousFolder,
            };
            //console.log(param);
            this.folderParam = param["modulePath"];
            this.folderName = [];

            //console.log(this.previousFolder);
            let res = {};
            if(folderName == "common") {
                res = {
                    "code": 200,
                    "data": [
                        "common copy.css",
                        "common.css",
                        "common_bkup.css"
                    ]
                }
            }
            else {
                res = {
                    "code": 200,
                    "data": [
                        "common",
                        "decision.css",
                        "fonts",
                        "home",
                        "index",
                        "lib",
                        "lib_bac",
                        "loader.css",
                        "main",
                        "navbar",
                        "new_common",
                        "pages",
                        "sub_admin.css"
                    ]
                }
            }

            //console.log(':-', res);


            var temp=[]
            if(res.code == 200){
                if(res.data.length > 0){
                    for(var i in res.data){
                        temp.push({
                            "folderFileName":res.data[i],
                            "isSelected":false
                        })
                    }
                    this.folderName.push(temp)
                    this.splitUrl=''
                }
                else{
                    this.showNoDataUi=true
                    this.splitUrl=''
                }
            }
            else if(res.code == 402){
                this.showNoDataUi=false
                this.$notify({title: 'Error', message: 'Session Expired',type: 'error' });
                this.redirectPage('Login');
            }
            else{
                this.$notify({title: 'Error', message: 'Something went wrong',type: 'error' });
            }
        },
        //select files and folders push into selected files/folder section
        handleCheckboxClick(selectedfile,selectedUrl) {
            //console.log("selectedfile",selectedfile);
            //console.log("selectedUrl",selectedUrl);
            //console.log(this.checkedItems);
            if(this.checkedItems[selectedUrl]==true) {
                if(!this.selectedFolders.includes(selectedUrl))
                {
                    this.selectedFolders.push({"selectedFiles":selectedfile,"selectedFilesUrl":selectedUrl})
                }
                this.selectedFolderArray.push({
                    "folder":selectedfile,
                    "isSelected":true
                })
                
            }
            else if(this.checkedItems[selectedUrl]==false) {
                var index = this.selectedFolders.findIndex(item=>item.selectedFilesUrl==selectedUrl)
                if(index != -1)
                {
                    this.selectedFolders.splice(index, 1); // Remove 1 item at the found index
                }
            }
        },
        //fetch config data
        fetchConfigData(){
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
            // //console.log("configD",res);
            if(res.code == 200){
                this.userType=res.data.userType;
                if(res.data.hasOwnProperty('access') && res.data.access.length > 0) {
                    if(res.data.hasOwnProperty('config')) {
                        for(var i in res.data.access) {
                            for(var j in Object.keys(res.data.config)) {
                                if(res.data.access[i]==Object.keys(res.data.config)[j]) {
                                    this.projects.push({
                                        baseUrl: res.data.config[res.data.access[i]]['baseUrl'],
                                        title: res.data.config[res.data.access[i]]['title'],
                                        identity: res.data.config[res.data.access[i]]['identity']
                                    });
                                }
                            } 
                            
                        }
                    }
                }
            }
        },
        //validate form upload all selected files folders
        UploadProjectForm(formName) {
            
            let param={
                "filesPath": this.selectedFolders,
                "title": this.UploadProjectModel.title,
                "desc": this.UploadProjectModel.description
            }
            for(var i in this.projects)
            {
                if(this.UploadProjectModel.selectProject==this.projects[i]['baseUrl'])
                {
                    param["projectName"]=this.projects[i]["identity"]
                }
                
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.selectedFolders.length == 0)
                    {
                        this.$notify({title: 'Warning', message: 'Please select files', type: 'warning' });
                        return;
                    }
                    let res = {
                        "code": 200
                    }
                    if(res.code == 200){
                        this.$notify({title: 'Success', message: 'Files uploaded successfully', type: 'success' });
                        this.$refs[formName].resetFields();
                        this.folderName=[]
                        this.selectedFolders=[]
                        this.checkedItems={}
                    }
                    else if(res.code == 402){
                        this.$notify({title: 'Error', message: 'Session Expired',type: 'error' });
                        this.redirectPage('Login');
                    }
                } else {
                    this.$notify({title: 'Error', message: 'Please do form validation', type: 'error' });
                    return false;
                }
            });
        },
        // backBtn
        BackBtn(url){
            this.backPress=1
            // //console.log("backpress",this.backPress);
            // if project Name is not selected
            if(this.UploadProjectModel.selectProject=='')
            {
                this.$notify({title: 'Warning', message: 'Please select project name',type: 'warning' });
                return;
            }
            // if project Name is selected but request is not hit on folder double click
            else if(this.folderParam=='')
            {
                this.$notify({title: 'Warning', message: 'Inaccessible',type: 'warning' });
                return;
            }
            // Do not access 
            if(this.splitUrl +'/' == this.UploadProjectModel.selectProject)
            {
                this.$notify({title: 'Warning', message: 'Inaccessible.',type: 'warning' });
                this.previousFolder=''
                return;
            }
            //trim url when back button is click
            if(this.splitUrl=='')
            {
                this.splitUrl=this.folderParam.split('/').slice(0,-1).join("/")
            }
            else{
                this.splitUrl= this.splitUrl.split('/').slice(0,-1).join("/")
            }
            var param={
                "modulePath":this.splitUrl
            }
            this.folderName=[]
            //hard-coded data after back from comman css folder from css
            let res = {
                "code": 200,
                "data": [
                    "common",
                    "decision.css",
                    "fonts",
                    "home",
                    "index",
                    "lib",
                    "lib_bac",
                    "loader.css",
                    "main",
                    "navbar",
                    "new_common",
                    "pages",
                    "sub_admin.css"
                ]
            }
            // after back from comman 
            // {
            //     "code": 200,
            //     "data": [
            //         "add_device",
            //         "backend",
            //         "config.php",
            //         "configure_azure.php",
            //         "css",
            //         "deleteMobileAppEmail.php",
            //         "get_all_link_device_old_status_to_new_collection.php",
            //         "get_ip.php",
            //         "get_video_storage_available_dates.php",
            //         "home.php",
            //         "iccc",
            //         "images",
            //         "include",
            //         "index.php",
            //         "index_bkup.php",
            //         "js",
            //         "login",
            //         "logout.php",
            //         "logs",
            //         "main.php",
            //         "marketing_portal",
            //         "navbar.php",
            //         "no_access_page.php",
            //         "notification.php",
            //         "pages",
            //         "phoenix",
            //         "sales_portal",
            //         "set_email_service",
            //         "sub_admin.php",
            //         "support_portal",
            //         "upload",
            //         "utility",
            //         "vendor"
            //     ]
            // }
                var temp=[]
                if(res.code == 200){
                    for(var i in res.data)
                        {
                            temp.push({
                                "folderFileName":res.data[i],
                                "isSelected":false
                            })
                        }
                    this.folderName.push(temp)
                    // //console.log('after bck', this.previousFolder);
                    this.previousFolder = this.previousFolder.split("/").slice(0,-1).join("/")
                    // //console.log( this.previousFolder);
                    // this.previousFolder=''
                }
                else if((res.code == 402)){
                    this.$notify({title: 'Error', message: 'Session Expired',type: 'error' });
                    this.redirectPage('Login');
                }
        },
        // get image according to file type
        getIconForFileType(fileName){
            if(fileName.includes(".json"))
                return json;
            else if(fileName.includes(".js"))
                return js;
            else if(fileName.includes(".php"))
                return php;
            else if(fileName.includes(".vue"))
                return vue;
            else if(fileName.includes(".py"))
                return python;
            else if(fileName.includes(".zip"))
                return zip;
            else if(fileName.includes(".html"))
                return html;
            else if(fileName.includes(".css"))
                return css;
            else if(fileName.includes(".txt") || fileName.includes(".log") || fileName.includes(".log"))
                return txt;
            else if(fileName.includes(".mp4"))
                return vedio;
            else if(fileName.includes(".png")||fileName.includes(".wepb")||fileName.includes(".jpg")||fileName.includes(".jpeg")||fileName.includes(".svg"))
                return image;
            else
                return folderIcon;
        }
    },
};
</script>

<style scoped>
    /* Write CSS */
</style>