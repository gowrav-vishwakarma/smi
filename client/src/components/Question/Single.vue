<template>
    <div>
        {{ question.title }} <br />
        {{ question.shortDescription }}
    </div>
</template>

<script>
export default {
    props: {
        question: Object,
    },
};
</script>
