<script setup lang="ts">
import { computed } from "vue";
import {
  getLocalTimeZone,
  PersianCalendar,
  toCalendar,
  today,
  parseDate,
} from "@internationalized/date";
import { useDateFormatter } from "reka-ui";
import { toDate } from "reka-ui/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import type { DateValue } from "@internationalized/date";

const props = defineProps<{
  highlight?: boolean;
  triggerClass?: string;
  triggerPlaceholderClass?: string;
}>();

const stringDate = defineModel<string | null>("date");

const calendarDate = computed({
  get() {
    // Convert YYYY-MM-DD string to a DateValue object for the Calendar
    return stringDate.value ? parseDate(stringDate.value) : undefined;
  },
  set(val) {
    // Convert DateValue object back to YYYY-MM-DD string for the model
    stringDate.value = val ? val.toString() : null;
  },
});

const defaultPlaceholder = toCalendar(today(getLocalTimeZone()), new PersianCalendar());
const formatter = useDateFormatter("fa");

const isEmpty = computed(() => {
  const value = calendarDate.value;
  return value === null || value === undefined || String(value).trim() === "";
});
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[240px] justify-start text-left font-normal',
            !calendarDate && 'text-muted-foreground',
            props.highlight && isEmpty && 'border-brand-primary-500',
            props.triggerClass,
          )
        "
      >
        <CalendarIcon />
        <span v-if="calendarDate">
          {{
            formatter.custom(toDate(calendarDate, getLocalTimeZone()), {
              numberingSystem: "latn",
            })
          }}
        </span>
        <span v-else :class="triggerPlaceholderClass">انتخاب تاریخ</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <div
        class="**:data-[slot=native-select-icon]:right-[unset] **:data-[slot=native-select-icon]:left-3.5"
      >
        <Calendar
          v-model="calendarDate"
          :default-placeholder="defaultPlaceholder"
          locale="fa-IR"
          layout="month-and-year"
          class="rounded-md border shadow-sm"
          dir="rtl"
          initial-focus
          @update:model-value="close"
        >
          <template #calendar-next-icon>
            <ChevronLeft />
          </template>
          <template #calendar-prev-icon>
            <ChevronRight />
          </template>
        </Calendar>
      </div>
    </PopoverContent>
  </Popover>
</template>
