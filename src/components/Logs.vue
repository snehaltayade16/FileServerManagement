<script setup>
    // Import Images
</script>

<template>
    <!-- HTML component -->
    <el-col :span="24" class="h-full w-full p-2.5">
        <el-container class="h-full w-full">
            <el-header class="!h-10 !p-0 mb-5 flex items-center">
                <!-- <el-input placeholder="Search by developer name or project name" v-model="searchLogs" clearable @input="handleSearch" class="h-full"></el-input> -->
                <el-row class="h-full w-full flex items-center justify-center">
                    <el-col :span="12">
                        <el-date-picker  size="large" v-model="value1" type="datetime"  placeholder="Select date and time" class="!w-full"   @change="fetchLogsData(1)"> </el-date-picker>
                    </el-col>
                </el-row>
            </el-header>
            <el-main class="!p-0 w-full">
                <el-table :data="filteredData" empty-text="No logs found" height="500px" class="w-full !h-full"  border >
                    <el-table-column type="index" label="Sr.No" width="80"></el-table-column>
                    <el-table-column prop="name" label="Developer Name" width="150"></el-table-column>
                    <el-table-column prop="projectName" label="Project Name" width="150"></el-table-column>
                    <el-table-column prop="module" label="Module" min-width="200"></el-table-column>
                    <el-table-column prop="description" label="Description" min-width="250"></el-table-column>
                    <el-table-column prop="ipAddress" label="IP Address" width="150"></el-table-column>
                    <el-table-column prop="date" label="Date" width="150"></el-table-column>
                    <el-table-column prop="filePath" label="File Path" min-width="400">
                        <template #default="{ row }">
                            <div v-for="(item, index) in row.filePath" :key="index">
                                {{index+1}}. {{item.selectedFiles}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer class="h-[60px] border flex items-center justify-center">
                <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize" :total="totalItems" @current-change="handlePageChange"></el-pagination>
            </el-footer>
        </el-container>
    </el-col>
</template>

<script>
    // Import mixins, initialize variable, and functions
    import requestMixin from '../mixins/requestMixin.js'
    export default {
        name:"Logs",
        mixins:[requestMixin],
        data()
        {
            return{
                value1:'',
                searchLogs:'',
                tableData: [],
                currentPage: 1,
                pageSize: 2, // Number of items per page
                totalItems: 0,
                filteredData: [], // Stores data after applying the search filter
                searchLogs: "",
            }
        },
        computed: {
            
        },
        mounted()
        {
            this.fetchLogsData(0)
        },
        methods:{
            fetchLogsData(type)
            {
                let today = new Date();
                var param={
                    "startTime": type==0 ? today.getFullYear() +"-"+ ("0"+(parseInt(today.getMonth())+1)).slice(-2) +"-"+ ("0"+today.getDate()).slice(-2) +" 00:00:00 " : this.value1.getFullYear() +"-"+ ("0"+(parseInt(this.value1.getMonth())+1)).slice(-2) +"-"+ ("0"+this.value1.getDate()).slice(-2) +" "+ ("0"+this.value1.getHours()).slice(-2) +":"+ ("0"+this.value1.getMinutes()).slice(-2) +":"+ ("0"+this.value1.getSeconds()).slice(-2),
                    "endTime":   type==0 ? today.getFullYear() +"-"+ ("0"+(parseInt(today.getMonth())+1)).slice(-2) +"-"+ ("0"+today.getDate()).slice(-2) +" 23:59:59"  : this.value1.getFullYear() +"-"+ ("0"+(parseInt(this.value1.getMonth())+1)).slice(-2) +"-"+ ("0"+this.value1.getDate()).slice(-2) +" 23:59:59",
                    "skip": 0,
                    "limit":200
                }
                this.filteredData=[];
                this.tableData=[];
                let res={};
                if(this.value1=='') {
                    res = {
                        "code": 200,
                        "msg": "Success",
                        "data": [
                            {
                                "_id": "678669579628e878b585589a",
                                "ip": "::ffff:127.0.0.1",
                                "os": "Windows",
                                "userName": "vinay.rathore",
                                "title": "ss",
                                "desc": "sss",
                                "projectName": "adminV2",
                                "uploadedFileFolders": [
                                    {
                                        "selectedFiles": "add_device",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/add_device"
                                    }
                                ],
                                "time": "2025-01-14 19:10:39"
                            }
                        ]
                    }
                }
                else {
                    res={
                        "code": 200,
                        "msg": "Success",
                        "data": [
                            {
                                "_id": "67823d7c29b81e72aea3e551",
                                "ip": "::ffff:127.0.0.1",
                                "os": "Windows",
                                "userName": "vinay.rathore",
                                "title": "pages",
                                "desc": "dadasd",
                                "projectName": "adminV2",
                                "uploadedFileFolders": [
                                    {
                                        "selectedFiles": "pages",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2//pages"
                                    }
                                ],
                                "time": "2025-01-11 15:14:28"
                            },
                            {
                                "_id": "67821ec929b81e72aea3e550",
                                "ip": "::ffff:127.0.0.1",
                                "os": "Windows",
                                "userName": "vinay.rathore",
                                "title": "er",
                                "desc": "ete",
                                "projectName": "adminV3",
                                "uploadedFileFolders": [
                                    {
                                        "selectedFiles": "check.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV3//check.php"
                                    },
                                    {
                                        "selectedFiles": "check2r.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV3//check2r.php"
                                    },
                                    {
                                        "selectedFiles": "checkSample.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV3//checkSample.php"
                                    },
                                    {
                                        "selectedFiles": "config.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV3//config.php"
                                    },
                                    {
                                        "selectedFiles": "configure_azure.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV3//configure_azure.php"
                                    }
                                ],
                                "time": "2025-01-11 13:03:29"
                            },
                            {
                                "_id": "67821ebf29b81e72aea3e54f",
                                "ip": "::ffff:127.0.0.1",
                                "os": "Windows",
                                "userName": "vinay.rathore",
                                "title": "acd",
                                "desc": "sfsfs",
                                "projectName": "app",
                                "uploadedFileFolders": [
                                    {
                                        "selectedFiles": "mobile",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//mobile"
                                    },
                                    {
                                        "selectedFiles": "SampleVideo_1280x720_10mb.mp4",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//SampleVideo_1280x720_10mb.mp4"
                                    },
                                    {
                                        "selectedFiles": "SampleVideo_1280x720_20mb.mp4",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//SampleVideo_1280x720_20mb.mp4"
                                    },
                                    {
                                        "selectedFiles": "SampleVideo_1280x720_5mb.mp4",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//SampleVideo_1280x720_5mb.mp4"
                                    },
                                    {
                                        "selectedFiles": "renderMpegtsUsingMss.html",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//renderMpegtsUsingMss.html"
                                    },
                                    {
                                        "selectedFiles": "renderMpegtsUsingMss_1.html",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//renderMpegtsUsingMss_1.html"
                                    },
                                    {
                                        "selectedFiles": "sampleVideoMP4.mp4",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/app//sampleVideoMP4.mp4"
                                    }
                                ],
                                "time": "2025-01-11 13:03:19"
                            },
                            {
                                "_id": "67821eae29b81e72aea3e54e",
                                "ip": "::ffff:127.0.0.1",
                                "os": "Windows",
                                "userName": "vinay.rathore",
                                "title": "telematics",
                                "desc": "bug fix",
                                "projectName": "adminV2",
                                "uploadedFileFolders": [
                                    {
                                        "selectedFiles": "zygal_cloud_link.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/pages/my_devices/devices/zygal_cloud_link/zygal_cloud_link.php"
                                    },
                                    {
                                        "selectedFiles": "backend",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/pages/my_devices/devices/zygal_cloud_link/devices/telematics/backend"
                                    },
                                    {
                                        "selectedFiles": "css",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/pages/my_devices/devices/zygal_cloud_link/devices/telematics/css"
                                    },
                                    {
                                        "selectedFiles": "images",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/pages/my_devices/devices/zygal_cloud_link/devices/telematics/images"
                                    },
                                    {
                                        "selectedFiles": "js",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/pages/my_devices/devices/zygal_cloud_link/devices/telematics/js"
                                    },
                                    {
                                        "selectedFiles": "telematics.php",
                                        "selectedFilesUrl": "/var/www/html/platform_dev_git/zygal/platform/adminV2/pages/my_devices/devices/zygal_cloud_link/devices/telematics/telematics.php"
                                    }
                                ],
                                "time": "2025-01-11 13:03:02"
                            }
                        ]
                    }
                }
                //console.log("--> first time ", res);
                if(res.code == 200){
                    //console.log(res.hasOwnProperty('data').length > 0);
                    if(res.hasOwnProperty('data') && res.data.length > 0)
                    {
                        //console.log(res.data);
                        res.data.map((items)=>{
                            //console.log(items.uploadedFileFolders);
                            this.tableData.push({
                                description:items.desc,
                                name:items.userName,
                                projectName:items.projectName,
                                ipAddress:items.ip,
                                filePath:items.uploadedFileFolders,
                                module:items.title,
                                date:items.time
                            })
                        })
                        this.updatePaginatedLogs();
                        this.totalItems = res.totalCount || res.data.length; // Total items returned from the server
                    }
                }
            },
            // Update paginated logs based on the current page and page size
            updatePaginatedLogs() {
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                this.filteredData = this.tableData.slice(start, end); // Slice data for current page
            },

            // Handle page change and update the paginated logs
            handlePageChange(page) {
                this.currentPage = page; // Update current page
                this.updatePaginatedLogs(); // Refresh logs for the new page
            },
        }
    }
</script>

<style scoped>
</style>