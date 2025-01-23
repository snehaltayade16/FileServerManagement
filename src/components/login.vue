<script setup>
    import logo from '../assets/zygal_logo.png';
    import background from '../assets/background.png';
    import { myStorage } from '../utils/customStorage';
    
</script>

<template>
    <div class="absolute inset-0 overflow-hidden bg-gray-100">
        <img :src="background" class="h-full w-full object-cover">
        <div class="sm:w-1/2 lg:w-80 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 border rounded-lg overflow-hidden bg-white shadow-lg">
            <div class="w-full mb-5 flex items-center justify-center">
                <img :src="logo" class="h-16">
            </div>
            <el-container class="w-full flex items-center justify-center flex-col">
                <el-form label-position="top" label-width="auto" ref="ruleFormRef" :model="ruleForm" :rules="rules" class="w-full">
                    <el-form-item label="Enter User Name" prop="userName" required class="!mb-8">
                        <el-input placeholder="Enter user name" v-model="ruleForm.userName" class="w-full"/>
                    </el-form-item>
                    <el-form-item label="Enter Password" prop="password" required class="!mb-8">
                        <el-input type="password" placeholder="Enter password" show-password v-model="ruleForm.password" class="w-full"/>
                    </el-form-item>
                    <el-row class="w-full flex items-center justify-end">
                        <el-button class="" type="primary" @click="OnSubmit('ruleFormRef')" >Submit</el-button>
                    </el-row>
                    <p class="text-center text-sm font-normal capitalize text-sky-600 cursor-pointer !pt-11  !pb-3 hover:!underline ">Forgot password ?</p>
                    <p class="text-center text-sm font-normal capitalize text-sky-600 cursor-pointer hover:!underline">Don't Have an account? signup</p>
                </el-form>
            </el-container>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        //validate password
        var ValidatePassword=(rule,value, callback)=>{
            // console.log(value);
            if(value == '') {
                callback(new Error("Please enter valid password"))
                return;
            }
            else if(!value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                callback(new Error("Please enter valid password"))
                return;
            }
            else
                callback();
        }
        return {
            ruleForm:{
                userName:'',
                password:''
            },
            rules:{
                userName: [
                    { required: true, message: 'Please enter user name ', trigger: 'blur' },
                ],
            password: [
                    { required: true, message: 'Please enter password', trigger: 'blur' },
                    {validator: ValidatePassword, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        async OnSubmit(formName) {
            const isValid = await this.$refs[formName].validate();
            if (isValid) {
                let param = {
                    userName: this.ruleForm.userName,
                    password: this.ruleForm.password,
                };
                // console.log(param);
                let res = {
                    "code": 400,
                    "msg": "User not found",
                };

                if(param.userName == 'snehal.tayade' && param.password == 'Snehal@123') {
                    res = {
                        "code": 200,
                        "msg": "User logged in successfully",
                        "data": [
                            "admin",
                            "adminV2",
                            "adminV3",
                            "agents",
                            "agentsAIV2",
                            "agentsAIV5",
                            "agentsAIV6",
                            "agentsAIV7",
                            "app"
                        ]
                    };
                }
                // console.log("Response:-", res);
                if(res.code == 200) {
                    this.$notify({title: 'Success', message: "Welcome" +" "+param["userName"].replace("."," ") ,type: 'success' });
                    myStorage.setItem('userName', param["userName"].replace("."," "));
                    this.redirectPage('home');
                }
                else if(res.code==400) {
                    this.$notify({title: 'Error', message: res.msg,type: 'error' });
                    return;
                }
            }
        },
        redirectPage(name = '', query = {}) {
            this.$router.push({
                name: name,
                query: query
            });
        }
    },
};
</script>
<style scoped>
    .custom-center-notification {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 9999;
        width: auto;
    }
</style>