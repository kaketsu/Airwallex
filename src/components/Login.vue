<template>
  <div class="main-block" ref="main">
    <div class="header">
       Broccoli & Co.
    </div>
    <div class="container">
      <div class="highlight">A better way</div>
      <div class="highlight">to enjoy every day.</div>
      <div class="sub-line">Be the first to know when we launch.</div>
      <a-button @click="requestInvite()">Request an invite</a-button>
    </div>
    <div class="footer">

    </div>

    <a-modal 
      v-model="modalVisible" 
      :footer="null" 
      class="invite-modal"
      :getContainer="() => this.$refs.main"
      :width="450"
      >
      <div class="invite-modal-header">
        {{
          this.success ? "Well done!" : "Request an invite"
        }}
      </div>
      
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <template v-if="!success">
          <a-form-model-item ref="fullname" prop="fullname">
            <a-input
              v-model="form.fullname"
              placeholder="fullname"
            />
          </a-form-model-item>
          <a-form-model-item ref="email" prop="email">
            <a-input
              v-model="form.email"
              placeholder="Email"
            />
          </a-form-model-item>
          <a-form-model-item ref="confirmEmail" prop="confirmEmail">
            <a-input
              v-model="form.confirmEmail"
              placeholder="Confirm email"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button class="send-btn" @click="request()" :disabled="sending">{{ this.sending ? 'Sending, please wait...': 'Send'}}</a-button>
          </a-form-model-item>
        </template>
        <template v-else>
          <a-form-model-item ref="fullname" prop="fullname">
            You will be one of the first to experience Broccoli & Co. when we launch.
          </a-form-model-item>
          <a-form-model-item>
            <a-button class="send-btn">OK</a-button>
          </a-form-model-item>
        </template>
      </a-form-model>
      
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        fullname: '',
        email: '',
        confirmEmail: '',
      },
      modalVisible: false,
      labelCol: { span: 0 },
      wrapperCol: { span: 22, push: 1 },
      rules: {
        fullname: [
          {required: true}
        ],
        email: [
          {
            required: true,
          },
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
        ],
        confirmEmail: [
          {
            required: true
          },
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            validator: this.checkDuplicatedEmail,
            trigger: 'blur',
          },
        ],
      },

      sending: false,
      success: false,
    }
  },
  methods: {
    requestInvite() {
      this.modalVisible = true;
    },
    async request() {
      const res = await this.$refs.form.validate();
      if (res) {
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
          this.success = true;
        }, 2000)
      }
    },
    checkDuplicatedEmail(rules, value, callback) {
      if (value !== this.form.email) {
        callback('Not same email address')
      } else {
        callback();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-block {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: 75px;
    display: flex;
    align-items: center;
    padding-left: 100px;
    font-weight: 800;
    border-bottom: 1px solid #bbb;
  }
  .container{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .highlight {
      font-size: 2.5em;
      font-weight: 800;
    }
    .sub-line {
      line-height: 60px;
    }
  }
  .footer {
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #bbb;
  }

  .invite-modal {
    
    .invite-modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      position: relative;
      &::after {
        content: '';
        display: block;
        height: 1px;
        width: 30px;
        border-bottom: 1px solid;
        position: absolute;
        bottom: 20px;
      }
    }
    .send-btn {
      width: 100%;
      margin-top: 40px;
      margin-bottom: 50px;
    }
    .ant-form-item {
      margin-bottom: 10px;
    }
    .ant-form-explain {
      text-align: left !important;
    }
  }
}
</style>