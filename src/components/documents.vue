<script setup>
import PDF from '../assets/pdf.png'
import VIEW from '../assets/visible.png'
import DOWNLOAD from '../assets/download.png'
import CLOSEICON from '../assets/delete.png'
import info from '../assets/info.png'
</script>
<template>
    <el-col :span="24" class="h-full p-2.5 flex items-start">
        <!-- user Section -->
        <el-container class="h-full w-full capitalize" v-if="userTypeDoc=='developer' || userTypeDoc=='tester' ">
            <!-- project name selection -->
            <el-header class="!p-0 mb-1 flex justify-between items-center">
                <el-row class="w-full">
                    <el-col :span="12" class="!flex items-center">
                        <p class="text-xl text-zinc-600 font-semibold">{{userTypeDoc}}</p>
                    </el-col>
                    <el-col :span="12">
                        <el-select placeholder="please select Project" size="large" v-model="UserViewprojectDocs" @change="fetchDocumentList()">
                            <el-option :value="items.identity" :label="items.title" v-for="(items,index) in selectProjectArray">{{ items.title }}</el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-header>
            <!-- document list -->
            <el-main class="scrollbar-hidden !p-0 rounded border border-gray-200 overflow-hidden" v-if="!ShowNoDocsFound">
                <div v-for="(item, keys, index) in filteredDeveloperData" class="h-auto w-full">
                    <div class="h-12 px-2.5 mb-2.5 sticky top-[-1px] flex justify-start items-center bg-gray-100">
                        <p class="text-md text-zinc-600 font-normal">{{ keys }}</p>
                    </div>
                    <div v-for="(innerItem, index) in item" class="h-24 w-full px-2.5 pb-5">
                        <div class="h-full w-full px-2.5 flex items-center justify-between bg-white border border-gray-200 shadow-md rounded overflow-hidden">
                            <div class="flex items-center justify-center">
                                <img :src="PDF" class="h-7 px-2.5"/>
                                <p class="text-sm text-zinc-600 font-normal">{{ innerItem.split("/").pop() }}</p>
                            </div>
                            <div class="flex items-center justify-center">
                                <el-tooltip class="item" effect="dark" content="Read Pdf" placement="bottom-start">
                                    <img :src="VIEW" class="h-5 px-2.5 " @click="viewPdf(innerItem)"/>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Download Pdf" placement="bottom-start">
                                    <img :src="DOWNLOAD" class="h-5 px-2.5" @click="downloadPdf(innerItem)"/>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Delete Pdf" placement="bottom-start">
                                    <img :src="CLOSEICON" class="h-5 px-2.5" @click="deletePdfDialogue(innerItem , keys)"/>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
            <!-- no doc found ui -->
            <el-main class="!flex !items-center !justify-center !p-0 rounded border border-gray-200" v-else-if="ShowNoDocsFound" >
                <p class="text-lg text-zinc-600 font-semibold">No Documents Found</p>
            </el-main>
            <!-- delete found Dialogue -->
            <el-dialog v-model="dialogVisible" title="Delete Document" width="500"  class="!p-2.5">
                <el-container>
                    <el-main class="!p-0">
                        <p class="text-lg text-zinc-600 font-normal">Are you sure you want to delete <span class="text-lg text-zinc-600 font-semibold">{{ deleteDocName }}</span></p>
                    </el-main>
                <el-footer class="!p-0 flex items-center justify-end">
                    <el-button type="danger" @click="DeletePdf()">Delete</el-button>
                </el-footer>
                </el-container>
            </el-dialog>
        </el-container>


        <!-- admin section -->
        <el-container class="h-full w-full" v-else-if="userTypeDoc=='admin'">
            <el-main id="list" class="!p-0 !flex overflow-hidden">
                <div class="h-full w-1/2 pr-[5px]">
                    <el-container class="h-full w-full p-2.5 rounded border border-gray-200 overflow-auto">
                        <el-header class="!p-0 mb-6 flex justify-between items-center border-b">
                            <p class="text-lg text-zinc-600 font-semibold">Upload Documents</p>
                        </el-header>
                        <!-- upload document form -->
                        <el-main class="!p-0">
                            <el-form  label-position="top" label-width="auto" ref="UploadDocumentsFormRef" :model="UploadDocumentsFormModel" :rules="UploadDocumentsFormRules">
                                <el-form-item label="User Type" required prop="type">
                                    <el-select placeholder="Enter user type " size="large" v-model="UploadDocumentsFormModel.type">
                                        <el-option label="Devloper" value="developer"></el-option>
                                        <el-option label="Tester" value="tester"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Project Title" required prop="projectTitle">
                                    <el-select placeholder="Enter project title" size="large" v-model="UploadDocumentsFormModel.projectTitle">
                                        <el-option :value="items.identity" :label="items.title" v-for="(items,index) in selectProjectArray">{{ items.title }}</el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Module Name" required prop="title">
                                    <el-input placeholder="Enter module name" size="large" v-model="UploadDocumentsFormModel.title"></el-input>
                                </el-form-item>
                                <el-form-item label="Upload Document" required class="" prop="uploadPDF" id="uploadPdfId">
                                    <el-upload  class="upload-demo !w-full" list-type="picture" ref="upload" :limit="1"  action=""  :auto-upload="false"  accept=".pdf" :on-change="handleChange"   :on-remove="handleRemove"  :file-list="UploadDocumentsFormModel.uploadPDF" >
                                        <el-button type="primary">Select PDF</el-button>
                                        <el-tooltip  class="box-item" effect="dark" placement="top-start">
                                        <template #content>Only one PDF file can be uploaded at a time.<br /> Only PDF files up to 2 MB in size are allowed. </template>
                                        <img :src="info" class="h-4 px-2.5" ></img>
                                    </el-tooltip >
                                    </el-upload>
                                    
                                </el-form-item>
                            </el-form>
                        </el-main>
                        <el-footer class="h-fit !p-0 flex justify-end items-end">
                            <el-button type="primary" @click="uploadPdf('UploadDocumentsFormRef')">Submit</el-button>
                        </el-footer>
                    </el-container>
                </div>
                <!-- document list ui-->
                <div class="h-full w-1/2 pl-[5px]">
                    <el-container class="scrollbar-hidden h-full w-full rounded border border-gray-200 overflow-auto">
                        <!-- project name selection -->
                        <el-header class="h-12 !p-0 mb-1 sticky top-[-1px]">
                            <el-select placeholder="Select Project " class="p-2.5" size="large" v-model="AdminViewprojectDocs" @change="fetchDocumentList()">
                                <el-option :value="items.identity" :label="items.title" v-for="(items,index) in selectProjectArray">{{ items.title }}</el-option>
                            </el-select>
                        </el-header>
                         <!-- document list ui-->
                        <el-main class="h-auto w-full !p-0" v-if="!ShowNoDocsFound">
                            <template v-for="(item, keys, index) in filteredDeveloperData">
                                <div class="h-12 px-2.5 mb-2.5 sticky top-[-1px] flex justify-start items-center bg-gray-100">
                                    <p class="text-lg text-zinc-600 font-semibold capitalize">{{ keys }}</p>
                                </div>
                                <div v-for="(innerItem, innerIndex) in item" class="h-24 w-full px-2.5 pb-5">
                                    <div class="h-full w-full px-2.5 flex items-center justify-between bg-white border border-gray-200 shadow-md rounded overflow-hidden">
                                        <div class="flex items-center justify-center">
                                            <img :src="PDF" class="h-7 px-2.5"/>
                                            <p class="text-sm text-zinc-600 font-normal">{{ innerItem.split("/").pop() }}</p>
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <el-tooltip class="item" effect="dark" content="Read Pdf" placement="bottom-start">
                                                <img :src="VIEW" class="h-5 px-2.5 " @click="viewPdf(innerItem)"/>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="Download Pdf" placement="bottom-start">
                                                <img :src="DOWNLOAD" class="h-5 px-2.5" @click="downloadPdf(innerItem)"/>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="Delete Pdf" placement="bottom-start">
                                                <img :src="CLOSEICON" class="h-5 px-2.5" @click="deletePdfDialogue(innerItem , keys)"/>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-main>
                        <!-- //No doc found ui -->
                        <el-main class="!flex !items-center !justify-center" v-else-if="ShowNoDocsFound" >
                            <p class="text-lg text-zinc-600 font-semibold">No Documents Found</p>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
            <!-- delete Dialogue -->
            <el-dialog v-model="dialogVisible" title="Delete Document" width="500"  class="!p-2.5">
                <el-container>
                    <el-main class="!p-0">
                    <p class="text-lg text-zinc-600 font-normal">Are you sure you want to delete <span class="text-lg text-zinc-600 font-semibold">{{ deleteDocName }}</span></p>
                </el-main>
                <el-footer class="!p-0 flex items-center justify-end">
                    <el-button type="danger" @click="DeletePdf()">Delete</el-button>
                </el-footer>
                </el-container>
            </el-dialog>
        </el-container>
    </el-col>
</template>

<script>
import requestMixin from '../mixins/requestMixin.js'
export default {
    name:'Documents',
    mixins:[requestMixin],
    data() {
        return {
            filteredDeveloperData: {},
            admin:false,
            UploadDocumentsFormModel:{
                title:'',
                projectTitle:'',
                description:'',       
                type:'',
                uploadPDF:[],
                fileList: [],
            },
            UploadDocumentsFormRules:{
                title:[{required: true, message: 'Please enter title', trigger: 'blur' },],
                projectTitle:[{required: true, message: 'Please enter project title', trigger: 'change' }],
                description:[{required: true, message: 'Please enter description', trigger: 'blur' }],
                type:[{required: true, message: 'Please enter developer type', trigger: 'change' }],
                uploadPDF: [{ required: true, message: "Please upload a PDF file.",trigger: ['change','blur']},],
            },
            dialogVisible:false,
            fileList: [], // Manage the uploaded file list
            SelectedPdf:'',
            selectProjectArray:[],
            userTypeDoc:'',
            UserViewprojectDocs:'',
            AdminViewprojectDocs:'',
            pdfUrl:'',
            deleteDocName:'',
            ShowNoDocsFound:false,
            docType:''

        }
    },
    mounted() {
        //console.log('Component is mounted!');
        this.fetchConfigDoc()
        //no document found ui 
        this.ShowNoDocsFound = true;
    },
    methods: {
        //fetch config
        fetchConfigDoc()
        {
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
                //console.log("--> doc", res);
                if(res.code == 200){
                    //console.log("sssssssssssss");
                    this.userTypeDoc=res.data.userType
                    this.userTypeDoc="admin"
                    if(res.data.hasOwnProperty('access') && res.data.access.length > 0)
                    {
                        if(res.data.hasOwnProperty('config'))
                        {
                            for(var i in res.data.access)
                            {
                                for(var j in Object.keys(res.data.config))
                                {
                                    if(res.data.access[i]==Object.keys(res.data.config)[j])
                                    {
                                        this.selectProjectArray.push({
                                            title: res.data.config[res.data.access[i]]['title'],
                                            identity: res.data.config[res.data.access[i]]['identity']
                                        });
                                    }
                                } 
                                
                            }
                        }
                    }
                }
               
            //console.log(this.selectProjectArray);
        },
        //fetch document List
        fetchDocumentList() {
            //console.log("33333333333333333333");
            this.filteredDeveloperData={}
            let param = {"projectName": this.userTypeDoc=="admin" ? this.AdminViewprojectDocs : this.UserViewprojectDocs}
            //console.log("Param:-", param);
            // hard-coded-data if user-type => "admin"
            let res={
                "code": 200,
                "data": {
                    "_id": "67821bcc29b81e72aea3e54d",
                    "projectName": "adminV2",
                    "tester": {},
                    "developer": {
                        "telematics": [
                            "https://uat.zygal.io:82/platform_dev_git/zygal/platform/app/mobile/developer_portal/backend/docs/adminV2/developer/telematics/Hd7MeTMLil.pdf"
                        ],
                        "user": [
                            "https://uat.zygal.io:82/platform_dev_git/zygal/platform/app/mobile/developer_portal/backend/docs/adminV2/developer/user/I5uabl6qnY.pdf"
                        ]
                    }
                }
            }
           
                //console.log("Response doc:-", res);
                if(res.code == 200) {
                    //if data not null
                    if(res.data!=null && Object.keys(res.data).length > 0)
                    {
                        this.ShowNoDocsFound=false
                        // for ADMIN
                        if(this.userTypeDoc == "admin")
                        {
                            for(var i in res.data.developer) {
                                if(res.data.developer[i].length > 0)
                                {
                                    this.filteredDeveloperData[i] = res.data.developer[i];
                                }
                                
                            }
                            for(var i in res.data.tester) {
                                if(res.data.tester[i].length > 0)
                                {
                                    this.filteredDeveloperData[i] = res.data.tester[i];
                                }
                            }
                        }
                        //for DEVELOPER
                        else if(this.userTypeDoc == "developer" )
                        {
                            if(Object.keys(res.data.developer).length > 0)
                                {
                                    for(var i in res.data.developer) {
                                        if(res.data.developer[i].length > 0)
                                        {
                                            this.filteredDeveloperData[i] = res.data.developer[i];
                                        }
                                        
                                    }
                                }
                            else{
                                this.ShowNoDocsFound=true
                            }
                        }
                        //for TESTER
                        else if(this.userTypeDoc=="tester")
                        {
                            if(Object.keys(res.data.tester).length > 0)
                            {
                                for(var i in res.data.tester) {
                                    if(res.data.tester[i].length > 0)
                                    {
                                        this.filteredDeveloperData[i] = res.data.tester[i];
                                    }
                                }                                   

                            }
                            else{
                                    this.ShowNoDocsFound=true
                                }
                        }
                        //console.log("Filter Data Array:-", this.filteredDeveloperData);
                    }
                    //if data is null
                    else
                    {
                        this.ShowNoDocsFound=true
                    }
                }
                else if(res.code=402)
                {
                    this.$notify({title: 'Error', message: "Session Expired",type: 'error' });
                    this.redirectPage('Login');
                }
                else {
                    this.$notify({title: 'Error', message: "Something went wrong",type: 'error' });
                }
           
        },
        // Handle successful upload
        handleSuccess(response, file, fileList) {
            //console.log(response, file, fileList);
            this.fileList = fileList;
            this.UploadDocumentsFormModel.uploadPDF = fileList.map(item => ({
                name: item.name,
            }));
            //console.log(this.fileList);
        },
         // Handle the change event to ensure that the model gets updated
        handleChange(file, fileList) {
            // Validate the file size (e.g., less than 2MB)
            const isLt2M = file.raw.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('File size must be less than 2 MB.');
                // Remove invalid file from the list
                this.UploadDocumentsFormModel.uploadPDF = fileList.filter(f => f.raw.size / 1024 / 1024 < 2);
                return;
            }
            this.UploadDocumentsFormModel.uploadPDF = fileList;
            // Add a custom thumbnail URL for each uploaded file
            this.UploadDocumentsFormModel.uploadPDF = fileList.map((item) => ({
                ...item,
                url: PDF, // Custom thumbnail for PDFs
            }));
            this.UploadDocumentsFormModel.uploadPDF.map((items)=>{
            this.SelectedPdf=items.raw
            })
        },
        //pdf remove function
        handleRemove(file, fileList)
        {
            const index = this.UploadDocumentsFormModel.uploadPDF.findIndex(f => f.name === file.name);
            if (index !== -1) {
                // Remove the file from the array
                this.UploadDocumentsFormModel.uploadPDF.splice(index, 1);
            }
        },
        //validate form
        uploadPdf(formName) {
            //console.log(Object.keys(this.SelectedPdf));
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let data =JSON.stringify({
                    "projectName": this.UploadDocumentsFormModel.projectTitle, 
                    "DocType": this.UploadDocumentsFormModel.type, 
                    "moduleName":this.UploadDocumentsFormModel.title,
                });
                //console.log("....",this.SelectedPdf);
                let formData = new FormData();
                formData.append('files[]',this.SelectedPdf)
                formData.append('data', data);
                //console.log();
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${this.BASE_PATH_BACKEND}/docs/projectDocs/uploadProjectDocs`, true);
                xhr.onload = () =>{
                    if (xhr.status === 200) {
                        let res = JSON.parse(xhr.responseText);
                        //console.log("Reaspose:- ", res);
                        if (res.status===true) {
                            this.$notify({title: 'Success', message: res.msg,type: 'success' });
                            this.$refs[formName].resetFields();
                        }
                    } else {
                        this.$notify({title: 'Error', message: "Something went wrong",type: 'error' });
                    }
                };
                xhr.send(formData);
            } else {
                this.$notify({title: 'Error', message: "Please do form validation",type: 'error' });
                return false;
            }
        });
        },
        //download pdf
        downloadPdf(pdf)
        {   
            //console.log(pdf);
            const url = pdf
            // Create an invisible <a> tag and trigger a click event to download the PDF
            const link = document.createElement('a');
            link.href = url;
            link.download = pdf.split("/").pop(); // Specify the file name to save as
            document.body.appendChild(link); // Append the link to the DOM
            link.click(); // Simulate a click event to start the download
            document.body.removeChild(link); // Remove the link after clicking
            this.$notify({title: 'Success', message: "Pdf downloaded successfully",type: 'success' });
        },
        //view pdf
        viewPdf(pdfUrl)
        {
            window.open(pdfUrl, '_blank');
        },
        //delete pdf dialogue 
        deletePdfDialogue(deleteUrlData)
        { 
            //console.log("deletepdf");
            this.dialogVisible=true
            var deleteSplit=deleteUrlData.split("/")
            this.docType=deleteSplit.slice(-3)
            this.deleteDocName=this.docType[2]
        },
        //delete pdf
        DeletePdf()
        {
            //console.log("sssssssssssssss");
            let param={
                "projectName": this.AdminViewprojectDocs,
                "DocType":this.docType[0],
                "moduleName":this.docType[1],
                "fileName" :this.docType[2]
            }
            for(var i in this.filteredDeveloperData)
                    {
                        for(var j in this.filteredDeveloperData[i])
                        {
                            if(this.filteredDeveloperData[i][j].split("/").pop()==param["fileName"])
                            {
                                this.filteredDeveloperData[i].splice(i,1)
                                if(this.filteredDeveloperData[i].length==0)
                                {
                                    delete this.filteredDeveloperData[i]
                                }
                            }
                        }
                    }
                this.dialogVisible=false
                //console.log(this.filteredDeveloperData);
                if(Object.keys(this.filteredDeveloperData).length==0)
                {
                    //console.log("no data found");
                    this.ShowNoDocsFound=true
                    this.AdminViewprojectDocs=''
                    
                }
                return
            this.request("/docs/projectDocs/deleteProjectDoc","POST",JSON.stringify(param)).then((res) => {
                //console.log("delete Response:-", res);
                if(res.code == 200) {
                    for(var i in this.filteredDeveloperData)
                    {
                        for(var j in this.filteredDeveloperData[i])
                        {
                            if(this.filteredDeveloperData[i][j].split("/").pop()==param["fileName"])
                            {
                                this.filteredDeveloperData[i].splice(i,1)
                                if(this.filteredDeveloperData[i].length==0)
                                {
                                    delete this.filteredDeveloperData[i]
                                }
                            }
                        }
                    }
                this.dialogVisible=false
                //console.log(this.filteredDeveloperData);
                if(Object.keys(this.filteredDeveloperData).length==0)
                {
                    //console.log("no data found");
                    this.ShowNoDocsFound=true
                }
                }
                else if(res.code=402)
                    this.redirectPage('Login');
            });
        }
    },
};
</script>
<style>
#uploadPdfId .el-upload{
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

</style>