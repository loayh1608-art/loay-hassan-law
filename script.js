const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
function addMessage(text, who) {
  const el = document.createElement('div');
  el.className = `message ${who === 'user' ? 'user-message' : 'bot-message'}`;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getReply(raw) {
  const q = raw.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[ًٌٍَُِّْـ]/g, ' ');
  if (/عنوان|مكان|فين|موقع المكتب|الخريطه|جوجل ماب|google maps/.test(q)) return 'عنوان المؤسسة: الزقازيق، حي المنتزة، شارع مديرية أمن الشرقية، برج الهدى عنتر 1، الطابق الثالث. رابط الموقع على Google Maps: https://maps.app.goo.gl/GekDbt73umBVJZcR9';
  if (/رقم|تليفون|هاتف|اتصل|واتساب|whatsapp|phone|تواصل/.test(q)) return 'للتواصل مع المؤسسة اتصل على 01061754007، أو راسلنا عبر واتساب من زر التواصل الموجود بالموقع.';
  if (/خدم|مجالات|تعملوا|بتقدموا|قانونيه/.test(q)) return 'تشمل قائمة مجالات الاستفسار: القضايا المدنية والعقارية والإيجارات والأسرة والميراث والجنح والمنازعات التجارية والعمل، وصياغة ومراجعة عقود البيع والإيجار والمقاولات والشراكة والعمل والخدمات والوكالة والتسوية والمخالصات. قبول أي ملف ونطاق الخدمة يتحددان بعد مراجعة الوقائع والمستندات والاختصاص.';
  if (/مستند|ورق|اوراق|الاستشاره|استشاره|موعد/.test(q)) return 'بصفة عامة، جهّز ملخصًا زمنيًا للوقائع وأي عقود أو إنذارات أو أحكام أو مراسلات مرتبطة بالموضوع. تختلف المستندات المطلوبة حسب نوع المسألة، فلا ترسل مستندات حساسة عبر هذه المحادثة؛ تواصل مع المكتب لتحديد المطلوب.';
  if (/سعر|تكلف|اتعاب|أتعاب|رسوم/.test(q)) return 'تتحدد الأتعاب بحسب نوع الخدمة ودرجة تعقيدها والمستندات والإجراءات المطلوبة. يُرجى التواصل مع المكتب لعرض طبيعة الطلب ومعرفة التفاصيل.';
  if (/طلاق|اسره|نفقه|ميراث|ورث/.test(q)) return 'المسائل الأسرية والميراث تختلف تفاصيلها القانونية حسب الوقائع والمستندات. يمكن للمكتب مراجعة الحالة بعد تحديد موعد؛ هذه الإجابة عامة ولا تحدد نتيجة قانونية.';
  if (/جنائي|جنايه|جنحه|حبس|محضر|نيابه/.test(q)) return 'إذا كان الأمر متعلقًا بمحضر أو جنحة أو إجراء عاجل، احتفظ بأرقام القضايا والمستندات ومواعيد الجلسات، وتواصل مع محامٍ مباشرة لتقييم الخطوة المناسبة. لا تعتمد على هذه الرسالة وحدها في مسألة عاجلة.';
  if (/عقد|عقود|بيع|شراء|ايجار|إيجار|ارض|عقار|تسليم|مقاوله|شراكه|وكاله|مخالصه/.test(q)) return 'في مسائل العقود والعقارات، قد تكون المستندات المهمة هي العقد، وإثباتات السداد، والإنذارات والمراسلات وأي مستندات ملكية. المطلوب يختلف حسب كل حالة، ويجب مراجعة المستندات قبل إبداء رأي محدد.';
  if (/اهلا|السلام|مرحبا|صباح|مساء/.test(q)) return 'أهلًا وسهلًا بك. اسألني عن خدمات المكتب أو العنوان أو طريقة التواصل أو تجهيز الاستفسار.';
  return 'أستطيع تقديم معلومات عامة عن خدمات المؤسسة وبيانات التواصل وتجهيز الاستفسار. لم أفهم السؤال بدقة؛ يمكنك توضيحه بكلمات أبسط أو التواصل مباشرة على 01061754007. لا أقدم رأيًا قانونيًا نهائيًا دون مراجعة الوقائع والمستندات.';
}
function sendQuestion(value) {
  const question = value.trim();
  if (!question) return;
  addMessage(question, 'user');
  chatInput.value = '';
  window.setTimeout(() => addMessage(getReply(question), 'bot'), 250);
}
chatForm?.addEventListener('submit', e => { e.preventDefault(); sendQuestion(chatInput.value); });
document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => sendQuestion(button.dataset.question)));
