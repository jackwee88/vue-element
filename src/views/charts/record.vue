 <template>
  <div style="padding:0 20px">
      <div class="top-header">
          可用积分：100000
      </div>
      <div class="input-item">
          <input type="text" placeholder="请输入需要划转积分" class="input"/>
          <input type="text" placeholder="请输入接收账号" class="input"/>
          <div style="color:#999;font-size:14px;padding:5px 0">当前可用积分10000，可划转积分8800</div>
          <div class="button11">划转</div>
      </div>
      <div>
          <p style="font-weight:bolder">划转记录</p>
       <ul>
            <li class="li">
                <div class="li-top">
                    <span class="p1">划转账号:111132113</span>
                    <span class="p2" style="color: red;">-8888</span>
                </div>
                <div class="time">2019-01-01：17：48</div>
            </li>
    </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }

}
</script>

<style>
.top-header{
    height: 100px;
    font-size: 18px;
    line-height: 100px;
}
ul{
    margin: 0;padding: 0;
}
.li-top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.time{
    color: #999;
    font-size:14px
}
li{
    list-style: none;

}
.li{
    border-bottom: 1px solid rgb(202, 198, 198);
    width: 320px;
    padding: 8px 0;
}
.input{
    border: none;
    border-bottom: 1px solid rgb(202, 198, 198);
    width: 320px;
    height: 40px;
    background-color: #f6fafd;
}

.button11{
    margin: 15px 0;
    background-color: rgb(29, 108, 167);
    height: 40px;
    color: white;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    width: 320px;
}

</style>