<script setup lang="ts"></script>

<template>
  <main>
    <header class="flex-center">
      <img width="160" src="@/assets/images/logo.png" alt="logo" />
    </header>

    <main class="flex-1 flex flex-col justify-center items-center p-8 text-center">
      <div class="welcome-text">
        <h1 class="text-2xl mb-4" style="color: #150a2a">به سامانه حامی یار خوش آمدید</h1>
        <p class="mb-12 text-lg" style="color: #3e1987">
          لطفاً جهت انجام امور اداری یکی از گزینه‌های زیر را انتخاب کنید.
        </p>
      </div>

      <div
        class="flex gap-8 flex-wrap justify-center md:flex-col md:gap-4 md:items-center md:w-full"
      >
        <a
          href="#eshteghal"
          class="flex flex-col items-center justify-center w-[220px] h-[180px] text-white no-underline rounded-[20px] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(62,25,135,0.4)] md:w-full md:max-w-[280px] md:h-auto md:flex-row md:justify-start md:gap-6 md:p-8 md:px-4"
          style="
            background: linear-gradient(135deg, #6a32d9 0%, #3e1987 100%);
            box-shadow: 0 10px 25px rgba(62, 25, 135, 0.3);
          "
        >
          <i
            class="fa-solid fa-graduation-cap mb-6 text-6xl md:mb-0 md:text-5xl"
            style="color: #e2d9f4"
          ></i>
          <span class="text-lg font-semibold">نامه اشتغال به تحصیل</span>
        </a>

        <a
          href="#karamoozi"
          class="flex flex-col items-center justify-center w-[220px] h-[180px] text-white no-underline rounded-[20px] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(62,25,135,0.4)] md:w-full md:max-w-[280px] md:h-auto md:flex-row md:justify-start md:gap-6 md:p-8 md:px-4"
          style="
            background: linear-gradient(135deg, #6a32d9 0%, #3e1987 100%);
            box-shadow: 0 10px 25px rgba(62, 25, 135, 0.3);
          "
        >
          <i
            class="fa-solid fa-briefcase mb-6 text-6xl md:mb-0 md:text-5xl"
            style="color: #e2d9f4"
          ></i>
          <span class="text-lg font-semibold">نامه کارآموزی</span>
        </a>
      </div>
    </main>

    <footer class="text-center p-6 bg-transparent text-sm" style="color: #3e1987">
      <p>
        ساخته شده با <span class="inline-block animate-heartbeat">💜</span> توسط انجمن علمی هوش
        مصنوعی
      </p>
    </footer>
  </main>
</template>
