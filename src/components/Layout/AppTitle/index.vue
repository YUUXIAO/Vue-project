<template>
    <div class="app-title">
        <h2>
            <slot></slot>
        </h2>
    </div>
</template>

<script>
export default {
    props:{
        // title:{
        //     type: String,
        //     default:'标题'
        // }
    },
    data(){
        return{ }
    }
}
</script>

