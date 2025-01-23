<script setup>
import PDF from '../assets/pdf.png'
import VIEW from '../assets/visible.png'
import DOWNLOAD from '../assets/download.png'
import CLOSEICON from '../assets/close.png'
</script>
<template>
    <el-col :span="24" class="h-full p-2.5 flex items-start">
        <el-container class="h-full w-full" v-if="admin">
            <el-header class="!p-0 flex justify-between items-center">
                <p class="text-lg text-zinc-600 font-semibold">Vihar Mehta</p>
                <el-button type="primary">+ Add</el-button>
            </el-header>
            <el-main id="list" class="!p-0 rounded border border-gray-200 overflow-hidden">
                <div v-for="(item, index) in temp" class="h-auto w-full">
                    <div class="h-12 px-2.5 mb-2.5 sticky top-[-1px] flex justify-start items-center bg-gray-100">
                        <p class="text-md text-zinc-600 font-normal">Heading {{ index+1 }}</p>
                    </div>
                    <div v-for="(item, index) in temp2" class="h-24 w-full px-2.5 pb-5">
                        <div class="h-full w-full px-2.5 flex items-center justify-between bg-white border border-gray-200 shadow-md rounded overflow-hidden">
                            <div class="flex items-center justify-center">
                                <img :src="PDF" class="h-7 px-2.5"/>
                                <p class="text-sm text-zinc-600 font-normal">admin_document_20241224120948.pdf</p>
                            </div>
                            
                            <div class="flex items-center justify-center">
                                <img :src="VIEW" class="h-5 px-2.5"/>
                                <img :src="DOWNLOAD" class="h-5 px-2.5"/>
                                <img :src="CLOSEICON" class="h-5 px-2.5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
        <el-container class="h-full w-full" v-else-if="!admin">
            <!-- <el-header class="!p-0 flex justify-between items-center">
                <p class="text-lg text-zinc-600 font-semibold">Vihar Mehta user</p>
                <el-button type="primary">+ Add</el-button>
            </el-header> -->
            <el-main id="list" class="!p-0 overflow-hidden">
                <el-form  label-position="top" label-width="auto" ref="UploadProjectForm" :model="UploadProjectModel" :rules="UploadProjectRules">
                    <el-form-item label="Title" required>
                        <el-select placeholder="Enter title">
                            <el-option title="Admin" value="admin">Admin</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Type" required>
                        <el-select placeholder="Enter type">
                            <el-option title="Backend Devloper" value="backend">Backend devloper</el-option>
                            <el-option title="Frontend Devloper" value="frontend">Frontend devloper</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Title" required>
                        <el-input placeholder="Enter title"></el-input>
                    </el-form-item>
                    <el-form-item label="Description" required>
                        <el-input title="type" value="type"></el-input>
                    </el-form-item>
                    <el-form-item label="Upload pdf file" required class="w-full flex justify-between items-center">
                        <el-upload class="upload-demo flex items-center justify-end" action="/upload" accept=".pdf" :before-upload="validateFileType"    :file-list="fileList" :on-remove="handleRemove">
                                <el-button type="primary">Select PDF</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">Only PDF files are allowed</div> -->
                            </el-upload>
                    </el-form-item>
                </el-form>
                <el-row class="flex items-center justify-end">
                    <el-button type="primary">+ ADD</el-button>
                </el-row>
                <div v-for="(item, index) in temp" class="h-auto w-full">
                    <div class="h-12 px-2.5 mb-2.5 sticky top-[-1px] flex justify-start items-center bg-gray-100">
                        <p class="text-md text-zinc-600 font-normal">Heading {{ index+1 }}</p>
                    </div>
                    <div v-for="(item, index) in temp2" class="h-24 w-full px-2.5 pb-5">
                        <div class="h-full w-full px-2.5 flex items-center justify-between bg-white border border-gray-200 shadow-md rounded overflow-hidden">
                            <div class="flex items-center justify-center">
                                <img :src="PDF" class="h-7 px-2.5"/>
                                <p class="text-sm text-zinc-600 font-normal">admin_document_20241224120948.pdf</p>
                            </div>
                            
                            <div class="flex items-center justify-center">
                                <img :src="VIEW" class="h-5 px-2.5"/>
                                <img :src="DOWNLOAD" class="h-5 px-2.5"/>
                                <img :src="CLOSEICON" class="h-5 px-2.5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-col>
</template>

<script>
export default {
    name:'Documents',
    data() {
        return {
            temp: 15,
            temp2: 11,
            admin:false
        }
    },
    mounted() {
    console.log('Component is mounted!');
    this.admin=false
    
    },
    methods: {
    },
};
</script>
<style scoped>
#list::-webkit-scrollbar {
    display: none; /* Hides the scrollbar (for WebKit browsers like Chrome and Safari) */
}
</style>