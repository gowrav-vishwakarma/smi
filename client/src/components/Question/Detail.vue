<template>
    <div>
        {{ question.title }}
    </div>
</template>

<script>
export default {
    props: {
        question: Object,
    },
};
</script>
