<template>
  <AposModal
    :modal="modal"
    :modal-title="modalTitle"
    class="apos-array-editor"
    @esc="confirmAndCancel"
    @inactive="modal.active = false"
    @show-modal="modal.showModal = true"
    @no-modal="$emit('safe-close')"
  >
    <template #secondaryControls>
      <AposButton
        label="apostrophe:cancel"
        type="default"
        @click="confirmAndCancel"
      />
    </template>
    <template #primaryControls>
      <AposButton
        :disabled="!valid"
        label="apostrophe:save"
        type="primary"
        @click="submit"
      />
    </template>
    <template #leftRail>
      <AposModalRail>
        <div class="apos-modal-array-items">
          <div class="apos-modal-array-items__heading">
            <div class="apos-modal-array-items__label">
              <span v-if="countLabel">
                {{ countLabel }}
              </span>
              <span
                v-if="minLabel"
                :class="minError ? 'apos-modal-array-min-error' : ''"
              >
                {{ minLabel }}
              </span>
              <span
                v-if="maxLabel"
                :class="maxError ? 'apos-modal-array-max-error' : ''"
              >
                {{ maxLabel }}
              </span>
            </div>
            <AposButton
              :disabled="maxed || itemError"
              :icon-only="true"
              :modifiers="['tiny', 'round']"
              class="apos-modal-array-items__add"
              icon="plus-icon"
              label="apostrophe:addItem"
              @click.prevent="add"
            />
          </div>
          <AposSlatList
            :selected="currentId"
            :value="withLabels(next)"
            class="apos-modal-array-items__items"
            @input="update"
            @select="select"
          />
        </div>
      </AposModalRail>
    </template>
    <template #main>
      <AposModalBody>
        <template #bodyMain>
          <div class="apos-modal-array-item">
            <div class="apos-modal-array-item__wrapper">
              <div class="apos-modal-array-item__pane">
                <div class="apos-array-item__body">
                  <AposSchema
                    v-if="currentId"
                    ref="schema"
                    :conditional-fields="conditionalFields()"
                    :following-values="followingValues()"
                    :schema="schema"
                    :server-errors="currentDocServerErrors"
                    :trigger-validation="triggerValidation"
                    :utility-rail="false"
                    :value="currentDoc"
                    @input="currentDocUpdate"
                    @validate="triggerValidate"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </AposModalBody>
    </template>
  </AposModal>
</template>

<script>
import AposArrayEditor from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposArrayEditor.vue'

export default {
  extends: AposArrayEditor,
  computed: {
    modalTitle() {
      return {
        key: 'apostrophe:editType',
        type: this.$t(this.field.label),
      }
    },
  },
}
</script>