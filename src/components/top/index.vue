<template>
    <div class="top">
        <div class="content">
            <div class="left">
                <img src="../../assets/images/p5.png" alt="">
                <p>Neoantigens Identification</p>
            </div>

            <div class="right">
                <p class="home">Home</p>

                <p class="contact">Contact Us</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">

.top{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 70px;
        background-color: white;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 70px;
                height: 70px;
                margin-right: 10px;
            }
            p {
                font-size: 1.5rem;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;

            p {
                margin-right: 10px;
            }
        }
    }
}
</style>