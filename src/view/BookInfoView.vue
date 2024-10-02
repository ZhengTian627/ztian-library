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
        this.getBookInfoAPI();
    },
    methods: {
        async getBookInfoAPI() {
            try {
                
                const response = await axios.get('https://countbooks-lobkotdo4a-uc.a.run.app');
                this.jsondata = response.data; 
                this.error = null;
            } catch (error) {
                console.error('Error fetching book info:', error);
                this.error = 'Failed to fetch book info. Please try again later.';
            }
        },
    },
};
</script>
