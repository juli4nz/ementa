<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <button class="modal-close" @click="$emit('close')">
              <i class="fas fa-times"></i>
            </button>
            <div class="modal-header-image">
              <slot name="header_image"></slot>
            </div>
          </div>

          <div class="modal-body" :class="has_image">
            <div class="modal-body-title">
              <slot name="title"></slot>
            </div>
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    has_image() {
      return { no_image: !this.$slots.header_image };
    }
  }
};
</script>

<style lang="scss" scoped>
.landscape {
  &.mobile {
    .modal-container {
      width: calc(100% - 350px);
    }
  }
  &.tablet {
    .modal-container {
      width: calc(100% - 500px);
    }
  }
  &.laptop {
    .modal-container {
      width: calc(100% - 650px);
    }
  }
  &.desktop {
    .modal-container {
      width: calc(100% - 50%);
    }
  }
}
.portrait {
  &.mobile {
    .modal-container {
      width: calc(100% - 100px);
    }
  }
  &.tablet {
    .modal-container {
      width: calc(100% - 300px);
    }
  }
  &.laptop {
    .modal-container {
      width: calc(100% - 400px);
    }
  }
  &.desktop {
    .modal-container {
      width: calc(100% - 600px);
    }
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: calc(100% - 100px);
  margin: 0px auto;
  padding: 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: hidden;
}

.modal-header {
  position: relative;
  .modal-header-image {
    width: 100%;
  }
}

.modal-body {
  padding: 15px;
  margin-bottom: 5px;
  &.no_image {
    margin-top: 45px;
  }
}

.modal-close {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 99999;
  outline: none;
  border: none;
  border-radius: 50px;
  background: rgba($color: #000000, $alpha: 0.5);
  padding: 2px 6px;
  cursor: pointer;
  i {
    font-size: 1.5rem;
    color: #efefef;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active {
  opacity: 1;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>