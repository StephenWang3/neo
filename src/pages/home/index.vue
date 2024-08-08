<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col h-full">
      <div class="font-600 text-3xl ml-20 mt-10">
        1. Input pFind result
        <!-- <n-space>
          <n-button text href="https://phagescope.deepomics.org/dataExample/data_demo/cluster_demo.fasta" tag="a"
            target="_blank" type="primary" class="text-lg" v-model:value="phagepaste">
            See Example FASTA sequence
          </n-button>
        </n-space> -->
      </div>

      <div class="flex flex-col justify-center items-center mt-10">
        <!-- <div class="mt-8 flex flex-row mb-5">
          <div class="font-500 text-2xl">Select an input type:</div>
          <div class="ml-5">
            <n-space vertical>
              <n-radio-group v-model:value="inputtype" name="radiogroup">
                <n-radio-button key="upload" value="upload">UPLOAD FILE</n-radio-button>
                <n-radio-button key="paste" value="paste">PASTE SEQUENCE</n-radio-button>
              </n-radio-group>
            </n-space>
          </div>

        </div> -->

        <n-alert title="Submit Note" type="info" closable class="w-180 bg-[#9ab4c5]">
          The naming convention of the uploaded file must be ${sample}-${mutation_type}.txt, e.g. HGSC3-SPE.txt. If not,
          please adjust this format.
        </n-alert>
      </div>

      <div class="flex flex-row justify-center">
        <div class="rounded w-190 h-40 mt-5 rounded-2xl" style="box-shadow: 0 0 64px #cfd5db"
          v-if="inputtype === 'upload'">
          <n-upload v-model:file-list="fileList" directory-dnd :default-upload="false" accept=".txt"
            @update:file-list="handleFileListChange" @remove="remove" show-remove-button>
            <n-upload-dragger>
              <div class="flex flex-col justify-center items-center">
                <p class="text-h5 mt-3 font-light" style="color: #028090">
                  Click or drag a file to this area to upload your file
                </p>

                <p class="text-sp mt-3 mb-3 text-opacity-100" style="color: #f07167">
                  TXT file size should be less than 10MB
                </p>
                <p class="text-sp mb-3 text-opacity-100" style="color: #f07167">
                  Supported formats: .txt
                </p>
              </div>
            </n-upload-dragger>
          </n-upload>
        </div>

        <div class="paste" v-if="inputtype === 'paste'">
          <div class="text-lg mb-6 w-190">
            Paste a fasta formatted nucleotide sequence.
          </div>
          <div class="w-190 mt-1 flex flex-row text-lg">
            <n-input round placeholder="Nucleotide Sequence" type="textarea" clearable :rows="10"
              v-model:value="pastefile"></n-input>
          </div>
          <div class="mt-4">
            <n-switch size="large" v-model:value="exampleSwicth" @update:value="examplechange" />
            <n-button-group>
              <n-button round size="large" class="w-50">Paste</n-button>
              <n-button round size="large" class="w-50">Copy</n-button>
            </n-button-group>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-row justify-center">
        <n-button size="large" color="#34498E" :width="70"
          class="text-white hover:text-white focus:text-white active:text-white text-2xl" @click="submit">
          Submit
        </n-button>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import type { UploadFileInfo } from 'naive-ui'
import {
  NButton,
  NButtonGroup,
  NRadioButton,
  NRadioGroup,
  NAlert,
  NUpload,
  NUploadDragger,
  NInput,
  NSwitch,
  useMessage,
  NSpace
} from 'naive-ui'
import axios from 'axios'
import { useRouteStore } from '@/stores/useRouteStore';

const fileList = ref<UploadFileInfo[]>([])
const submitfile = ref<File>()
const inputtype = ref('upload')
const pastefile = ref('')
const phagepaste = ref('')
const exampleSwicth = ref(false)
const message = useMessage()

const router = useRouter()
// 获取 store 实例
const routeStore = useRouteStore();

const examplechange = async () => {
  console.log(exampleSwicth.value)
  if (exampleSwicth.value) {
    const fileURL = new URL(
      '../../../public/data/sequence.fasta',
      import.meta.url
    )
    const response = await fetch(fileURL)
    const content = await response.text()
    console.log(content)
    pastefile.value = content
  } else {
    pastefile.value = ''
  }
}


const handleFileListChange = (data: UploadFileInfo[]) => {
  console.log("handleFileListChange data[0]: {}", data[0])
  if (data[0]?.name.match(/(.txt)$/g) === null) {
    message.error('Uploaded file must be txt format.')
    data.pop()
  } else if (data[0]?.file?.size === 0 || data[0]?.file?.size === undefined) {
    message.error('Uploaded file cannot be empty.')
    data.pop()
  } else if (data[0]?.file.size / 1024 / 1024 > 100) {
    message.error('Uploaded file cannot exceed 100MB.')
    data.pop()
  } else if (data.length > 1) {
    message.error('Cannot upload more than one files.')
    data.pop()
  } else if (data.length === 1) {
    submitfile.value = data[0].file
    fileList.value[0] = data[0]
  }
}
const remove = () => {
  submitfile.value = undefined
  fileList.value.pop()
}


const submit = async () => {
  const submitdata = new FormData()
  submitdata.append('rundemo', 'false')
  const precheck = ref(false)
  submitdata.append('inputtype', inputtype.value)
  // check empty
  if (inputtype.value === 'upload') {
    if (typeof submitfile.value === 'undefined') {
      message.error('Please upload file')

      precheck.value = false
    } else {
      submitdata.append('file', submitfile.value as File)
      precheck.value = true
    }
  }
  else {
    if (pastefile.value.length > 0) {
      submitdata.append('file', pastefile.value)
      precheck.value = true
    } else {
      message.error('Please input sequence')
      precheck.value = false
    }
  }

  if (precheck.value) {
    const response = await axios.post('http://localhost:8888/file_processor/getResult/', submitdata)
    console.log("send request...")
    const { data } = response
    console.log('get data', data)
    if (data.status === 'success') {
      message.success(data.status)
      routeStore.setRouteParam(data.result);
      router.push({
        name: 'result',
      })
    } else {
      message.error(data.message)
    }
  }
}
</script>

<style scoped></style>