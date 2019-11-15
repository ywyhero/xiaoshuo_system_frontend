<template>
    <div class="logs">
        <el-table
                :data="logs"
                height="100%"
                border
                style="width: 100%">
                <el-table-column
                prop="name"
                label="小说名称">
                </el-table-column>
                <el-table-column
                label="创建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Common from './../service/common';
import { Table, TableColumn, Pagination } from 'element-ui';
import MkTime from 'mktime';
@Component({
    components: {
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
    },
})
export default class StoryLogs extends Vue {
    private logs: object[] = [];
    public created() {
        this.getLogs();
    }
    private async getLogs() {
        const data: any = await Common.stoyLogs({});
        this.logs = data.logs.map((v: any) => ({
            ...v,
            createTime: MkTime.format(new Date(v.createTime).getTime() / 1000, 7),
        }));
    }
}
</script>
<style lang="less" scoped>
.logs{
    padding: 30px;
}
</style>
