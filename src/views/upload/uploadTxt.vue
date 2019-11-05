<template>
    <div>
        <!-- <form id="form" action="http://192.168.44.21:8000/api/uploadTxt"  method="post" enctype="multipart/form-data"> -->
            <input type="file" name="file" id="file" value="" multiple="multiple" @change="handlerChange">
            <!-- <input type="text" value="submit" @click="submit"> -->
        <!-- </form> -->
    </div>
</template>
<script>
import Axios from './../../config/Axios';
import ENV from './../../config/env';
export default {
    methods: {
        handlerChange(e) {
            const files = e.target.files;
            const fd = new FormData();
            fd.append('file', files[0]);
            Axios.post(`${ENV.api}/uploadTxt`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                // console.log(res);
            });
        },
    },
};
</script>