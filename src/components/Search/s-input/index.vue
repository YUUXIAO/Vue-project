<template>
    <div>
        <el-col :span="colSpan">
            <div>
                <el-form-item :label="label">
                    <el-input v-model="inputValue" v-bind="$attrs" v-on="$listeners" clearable></el-input>
                </el-form-item>
            </div>
        </el-col>
    </div>
</template> 

<script>
export default {
    name:'searchInputItem',
    props:{
        value:{
            type: String,
            default: ''
        },
        colSpan:{
            type: [Number],
            default: 6
        },
        label:{
            type:String,
            default:'INPUT'
        }
    },
    data(){
        return{
            inputValue:this.value
        }
    },
    watch:{
        inputValue(){
            this.$emit('input',this.inputValue)
        },
        value(){
            console.log(this.value)
            this.inputValue = this.value
        }
    }
}
</script>
