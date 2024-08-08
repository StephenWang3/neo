<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-col h-full mt-10">
            <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" :scroll-x="1800"/>
        </div>
    </div>

</template>


<script setup lang="ts">
import { DataTableColumns } from 'naive-ui'
import { NDataTable } from 'naive-ui'
import { useRouteStore } from '@/stores/useRouteStore';


const routeStore = useRouteStore();

interface Peptide {
    ID: string;
    '#': number;
    Title: string;
    Charge: number;
    Sq: string;
    Mod_Sites: string | null;
    Score: number;
    "Spectra Mass": number;
    "Q value": number;
    "Theory Sq Mass": number;
    "Delta Mass": number;
    "Delta Mass (PPM)": number;
    "Specific Flag": string;
    "Label Flag": number;
    "Target_Decoy": boolean;
    "Protein AC": string;
    "Matched DNA": string;
    "Matched in Control JF": string;
    "Matched in Cancer JF": string;
    "nFreq": number | null;
    "cFreq": number;
    "TSA": string;
}


function createColumns(): DataTableColumns<Peptide> {
    return [
        { title: 'ID', key: 'ID', width: 60, fixed: 'left' },
        { title: '#', key: '#' },
        { title: 'Title', key: 'Title' },
        { title: 'Charge', key: 'Charge', width: 75 },
        { title: 'Sq', key: 'Sq' },
        // { title: 'Mod Sites', key: 'Mod_Sites' },
        // { title: 'Score', key: 'Score' },
        // { title: 'Spectra Mass', key: 'Spectra Mass' },
        // { title: 'Q value', key: 'Q value' },
        // { title: 'Theory Sq Mass', key: 'Theory Sq Mass' },
        // { title: 'Delta Mass', key: 'Delta Mass' },
        // { title: 'Delta Mass (PPM)', key: 'Delta Mass (PPM)' },
        // { title: 'Specific Flag', key: 'Specific Flag' },
        // { title: 'Label Flag', key: 'Label Flag' },
        // { title: 'Target_Decoy', key: 'Target_Decoy' },
        { title: 'Protein AC', key: 'Protein AC' },
        { title: 'Matched DNA', key: 'Matched DNA' },
        { title: 'Matched in Control JF', key: 'Matched in Control JF', width: 170 },
        { title: 'Matched in Cancer JF', key: 'Matched in Cancer JF', width: 170 },
        { title: 'nFreq', key: 'nFreq' },
        { title: 'cFreq', key: 'cFreq' },
        { title: 'TSA', key: 'TSA' },
    ]
}

// JSON 字符串转换为 Peptide 对象数组的函数
function parsePeptideJSON(jsonStr: string): Peptide[] {
    try {
        const data = JSON.parse(jsonStr);
        if (!Array.isArray(data)) {
            throw new Error("Parsed JSON is not an array");
        }
        return data.map(item => ({
            ID: item.ID,
            '#': item['#'],
            Title: item.Title,
            Charge: item.Charge,
            Sq: item.Sq,
            Mod_Sites: item.Mod_Sites || null,
            Score: item.Score,
            "Spectra Mass": item["Spectra Mass"],
            "Q value": item["Q value"],
            "Theory Sq Mass": item["Theory Sq Mass"],
            "Delta Mass": item["Delta Mass"],
            "Delta Mass (PPM)": item["Delta Mass (PPM)"],
            "Specific Flag": item["Specific Flag"],
            "Label Flag": item["Label Flag"],
            "Target_Decoy": item["Target_Decoy"],
            "Protein AC": item["Protein AC"],
            "Matched DNA": item["Matched DNA"],
            "Matched in Control JF": item["Matched in Control JF"],
            "Matched in Cancer JF": item["Matched in Cancer JF"],
            "nFreq": item["nFreq"] || null,
            "cFreq": item["cFreq"],
            "TSA": item["TSA"]
        }));
    } catch (err) {
        console.error("Failed to parse JSON:", err);
        return []; // 返回空数组以作为失败的回退
    }
}

const data: Peptide[] = parsePeptideJSON(routeStore.routeParam)

const columns = createColumns()
const pagination = false
</script>