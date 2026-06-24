document.addEventListener('DOMContentLoaded', () => {
    // 获取所有的导航菜单项
    const navItems = document.querySelectorAll('.nav-item');
    // 获取所有对应的内容板块
    const sections = document.querySelectorAll('.content-section');

    /**
     * 1. 滚动联动高亮 (Scrollspy)
     */
    function changeActiveNavOnScroll() {
        let currentSectionId = '';
        
        // 设定一个触发的垂向偏移量（例如距离视口顶部 150px 时切换）
        const scrollOffset = 150; 
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 当滚动条超过当前板块的顶部减去偏移量时，记录当前板块的ID
            if (scrollPosition >= sectionTop - scrollOffset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // 移除所有项的 active 类，并为当前滚动到的项添加 active
        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === currentSectionId) {
                    item.classList.add('active');
                }
            });
        }
    }

    /**
     * 2. 点击导航平滑滚动增强（选填，HTML本身已支持 scroll-behavior）
     * 如果需要在某些老旧浏览器中完美支持，或者需要更精准的滚动对齐
     */
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 计算滚动位置：减去顶部保留的适量空白
                const targetOffsetTop = targetSection.offsetTop - 40;
                
                window.scrollTo({
                    top: targetOffsetTop,
                    behavior: 'smooth'
                });

                // 手动立即切换高亮状态，提供即时点击反馈
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // 监听滚动事件，并使用节流/防抖或者 RequestAnimationFrame 保证流畅度
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(changeActiveNavOnScroll);
    });

    // 初始化运行一次，防止页面刷新停在中间时高亮不正确
    changeActiveNavOnScroll();
});