<template>
  <AposModal
    class="apos-array-editor"
    :modal="modal"
    :modal-title="modalTitle"
    @inactive="modal.active = false"
    @show-modal="modal.showModal = true"
    @esc="confirmAndCancel"
    @no-modal="$emit('safe-close')"
  >
    <template #secondaryControls>
      <AposButton
        type="default"
        label="apostrophe:cancel"
        @click="confirmAndCancel"
      />
    </template>
    <template #primaryControls>
      <AposButton
        type="primary"
        label="apostrophe:save"
        :disabled="!valid"
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
              class="apos-modal-array-items__add"
              label="apostrophe:addItem"
              :icon-only="true"
              icon="plus-icon"
              :modifiers="['tiny', 'round']"
              :disabled="maxed || itemError"
              @click.prevent="add"
            />
          </div>
          <AposSlatList
            class="apos-modal-array-items__items"
            @input="update"
            @select="select"
            :selected="currentId"
            :value="withLabels(next)"
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
                    :schema="schema"
                    :trigger-validation="triggerValidation"
                    :utility-rail="false"
                    :following-values="followingValues()"
                    :conditional-fields="conditionalFields()"
                    :value="currentDoc"
                    @input="currentDocUpdate"
                    @validate="triggerValidate"
                    :server-errors="currentDocServerErrors"
                    ref="schema"
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
