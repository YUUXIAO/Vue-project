<template>
  <div id='login'>
    <el-Form id='loginForm' status-icon :model="loginForm" :rules='loginRules' ref='loginForm' label-width='100'>
      <el-form-item label=' 账户 ' prop='name'>
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label='密码 ' prop='password'>
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary ' @click='submitLoginForm( "loginForm") '>登陆</el-button>
        <el-button type='primary ' @click='resetForm( "loginForm") '>重置</el-button>
      </el-form-item>
    </el-Form>
  </div>
</template>
<script>
 export default {
   name: 'login',
   data() {
     var validateName = ( rule, value, callback ) =>{
      if(value==''){
        return callback(new Error('账户不能为空'));
       }
     }
     var validatePass = ( rule, value, callback ) =>{
      if(value==''){
        return callback(new Error('密码不能为空'));
       }
     }
     return {
       loginForm:{
         name:"",
         password:""
       },
      loginRules:{
        name: [{ validator: validateName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
      }
     }
   },
   methods:{
    submitLoginForm(formName){
      this.$refs[formName].validate( (valid) =>{
        if(valid){
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //   this.$router.push({ path: '/' }); //登录成功之后重定向到首页
          // }).catch(err => {
          //   this.$message.error(err); //登录失败提示错误
          // });
          this.$router.push({ path: '/' });
        }else{
          console.log('登陆失败')
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
    }
   },
   created() {

   }}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#login {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  position: fixed;
}
#loginForm {
  width: 400px;
  border: 1px solid #333;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  padding: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: #777 0 0 5px 2px;
}
</style>

