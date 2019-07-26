<template>
    <div>
        <el-col :span="colSpan">
            <el-form-item :label="label" style="width: 100%;">
                <div class="block">
                    <el-date-picker type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="dateValue" v-bind="$attrs" v-on="$listeners" style="width: 100%;"></el-date-picker>
                </div>
            </el-form-item>
        </el-col>
    </div>
</template> 

<script>
export default {
    name:'searchDaterangeItem',
    props:{
        value:{
            type:Array,
            default:[]
        },
        colSpan:{
            type: [Number],
            default: 6
        },
        label:{
            type:String,
            default:'DATE'
        }
    },
    data(){
        return{
            dateValue:this.value
        }
    },
    watch:{
        dateValue(){
            this.$emit('input',this.dateValue)
        },
        value(){
            this.dateValue = this.value
        }
    }
}
</script>
