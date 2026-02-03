import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { StudentInfo } from "@/types/requests/student";

export const useStudentStore = defineStore("student", () => {
  const _student = ref<StudentInfo | null>(null);
  const _exists = ref(false);

  const student = computed(() => _student.value);
  const exists = computed(() => _exists.value);

  function setStudent(studentInfo: StudentInfo): void {
    _student.value = studentInfo;
    _exists.value = true;
  }

  function clearStudent(): void {
    _student.value = null;
    _exists.value = false;
  }

  return {
    student,
    exists,
    setStudent,
    clearStudent,
  };
});

