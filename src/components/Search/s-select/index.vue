<template>
    <div>
        <el-col :span="colSpan">
            <el-form-item :label="label">
                <el-select v-model="selectValue" v-bind="$attrs" v-on="$listeners" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
    </div>
</template> 

<script>
export default {
    name:'searchSelectItem',
    props:{
        value:{
            type: [ String , Number ],
            default: ''
        },
        colSpan:{
            type: Number,
            default: 6
        },
        label:{
            type:String,
            default:'SELECT'
        },
        options:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            selectValue:this.value
        }
    },
    watch:{
        value(){
            this.selectValue = this.value
        },
        selectValue(){
            this.$emit('input',this.selectValue)
        }
    }
}
</script>
