<template>
    <div>
        <el-col :span="colSpan">
            <div>
                <el-form-item :label="label">
                    <el-radio-group v-model="radioValue">
                        <el-radio v-for="item in radioList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
        </el-col>
    </div>
</template> 

<script>
export default {
    name:'searchRadioItem',
    props:{
        value:'',
        colSpan:{
            type: [Number],
            default: 6
        },
        label:{
            type:String,
            default:'RADIO'
        },
        radioList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            radioValue:this.value
        }
    },
    watch:{
        radioValue(){
            this.$emit('input',this.radioValue)
        },
        value(){
            this.radioValue = this.value
        }
    }
}
</script>
