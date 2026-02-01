<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/vue";

interface Props {
  icon: string;
  title: string;
  description: string;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: true,
});

const emit = defineEmits<{
  "start-service": [];
}>();
</script>

<template>
  <Card
    class="group rounded-3xl transition-all duration-300 border-2 w-full relative"
    :class="{
      'hover:shadow-md hover:-translate-y-1': props.isActive,
      'opacity-60 pointer-events-none': !props.isActive,
    }"
  >
    <Badge v-if="!props.isActive" variant="destructive" class="absolute top-4 left-4 z-10 opacity-90">
      غیر فعال
    </Badge>

    <CardHeader class="text-center" :class="{ grayscale: !props.isActive }">
      <div
        class="p-5 w-max mx-auto rounded-3xl bg-brand-primary-50 mb-4 -mt-16 transition-colors duration-300 border-2"
      >
        <Icon
          :icon="props.icon"
          class="size-15 text-primary transition-all duration-300"
          :class="{
            'group-hover:rotate-12 group-hover:scale-110': props.isActive,
          }"
        />
      </div>

      <CardTitle class="text-xl">
        {{ props.title }}
      </CardTitle>
    </CardHeader>

    <CardContent :class="{ grayscale: !props.isActive }">
      <p class="text-muted-foreground text-sm">
        {{ props.description }}
      </p>
    </CardContent>

    <CardFooter class="pt-0" :class="{ grayscale: !props.isActive }">
      <Button
        @click="emit('start-service')"
        class="w-full border-2"
        size="xl"
        variant="subtle"
        :disabled="!props.isActive"
      >
        شروع درخواست
        <Icon icon="mdi:arrow-left" class="size-5 mr-2" />
      </Button>
    </CardFooter>
  </Card>
</template>
