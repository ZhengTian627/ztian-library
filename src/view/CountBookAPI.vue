<template>
    <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() { 
        this.getBookCountAPI();
    },
    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://countbooks-lobkotdo4a-uc.a.run.app');
                this.jsondata = response.data;
                this.error = null;
            } catch {
                console.error('Error fatching book count:', error);
                this.error = 'Failed to fetch book count. Please try again later.';
                this.count = null;
            }
        },
    },
};
</script>