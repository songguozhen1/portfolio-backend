const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 导入模型
const User = require('./models/User');
const Project = require('./models/Project');
const BlogPost = require('./models/BlogPost');
const Comment = require('./models/Comment');
const Message = require('./models/Message');

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 连接成功');
  } catch (error) {
    console.error('❌ MongoDB 连接失败:', error);
    process.exit(1);
  }
};

// 清空数据库
const clearDatabase = async () => {
  console.log('🗑️  清空旧数据...');
  await User.deleteMany({});
  await Project.deleteMany({});
  await BlogPost.deleteMany({});
  await Comment.deleteMany({});
  await Message.deleteMany({});
  console.log('✅ 旧数据已清空');
};

// 创建测试数据
const seedData = async () => {
  try {
    await connectDB();
    await clearDatabase();

    // 1. 创建管理员用户
    console.log('👤 创建用户...');
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@portfolio.com',
      password: 'admin123' // 会自动被哈希
    });
    console.log('✅ 管理员创建成功: admin / admin123');

    // 2. 创建项目
    console.log('📁 创建项目...');
    const projects = await Project.create([
      {
        title: '个人博客系统',
        description: '一个功能完善的个人博客系统，支持Markdown编辑、评论功能、标签分类等。使用React和Node.js构建，界面简洁美观。',
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        repoUrl: 'https://github.com/yourusername/blog-system',
        liveUrl: 'https://blog-demo.vercel.app',
        user: adminUser._id
      },
      {
        title: '电商平台前端',
        description: '响应式电商网站前端，包含商品展示、购物车、结算流程等完整功能。采用React + Redux架构，UI设计精美。',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        repoUrl: 'https://github.com/yourusername/ecommerce-frontend',
        liveUrl: 'https://shop-demo.vercel.app',
        user: adminUser._id
      },
      {
        title: '任务管理应用',
        description: '团队协作任务管理工具，支持拖拽排序、任务分配、进度追踪。灵感来自Trello，使用React DnD实现。',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
        repoUrl: 'https://github.com/yourusername/task-manager',
        liveUrl: 'https://tasks-demo.vercel.app',
        user: adminUser._id
      },
      {
        title: '天气预报应用',
        description: '实时天气查询应用，集成OpenWeather API，支持城市搜索、5天预报、天气地图等功能。界面清新简约。',
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
        repoUrl: 'https://github.com/yourusername/weather-app',
        liveUrl: 'https://weather-demo.vercel.app',
        user: adminUser._id
      },
      {
        title: 'Recipe Finder 食谱应用',
        description: '基于食材搜索食谱的应用，集成Spoonacular API，提供详细的营养信息和烹饪步骤。',
        imageUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800',
        repoUrl: 'https://github.com/yourusername/recipe-finder',
        liveUrl: 'https://recipes-demo.vercel.app',
        user: adminUser._id
      },
      {
        title: '社交媒体仪表板',
        description: '社交媒体数据分析仪表板，使用Chart.js可视化展示粉丝增长、互动数据等指标。支持多平台数据聚合。',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        repoUrl: 'https://github.com/yourusername/social-dashboard',
        liveUrl: 'https://social-demo.vercel.app',
        user: adminUser._id
      }
    ]);
    console.log(`✅ ${projects.length} 个项目创建成功`);

    // 3. 创建博客文章
    console.log('📝 创建博客文章...');
    const blogPosts = await BlogPost.create([
      {
        title: 'React Hooks 完全指南',
        content: `React Hooks 彻底改变了我们编写 React 组件的方式。在这篇文章中，我将深入探讨最常用的 Hooks 以及它们如何简化你的代码。

## 什么是 React Hooks？

Hooks 是 React 16.8 引入的新特性，它让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## useState Hook

useState 是最基础的 Hook，它让函数组件也能拥有状态管理能力：

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

useEffect 让你能在函数组件中执行副作用操作，它相当于 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合：

\`\`\`javascript
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);
\`\`\`

## 最佳实践

1. 总是在函数组件的顶层调用 Hooks
2. 只在 React 函数中调用 Hooks
3. 使用 ESLint 插件来强制执行这些规则

Hooks 让 React 开发更加直观和强大。赶快开始使用它们吧！`,
        author: adminUser._id
      },
      {
        title: '使用 Node.js 和 Express 构建 RESTful API',
        content: `构建一个健壮的 REST API 是现代 Web 开发的基本技能。在本教程中，我们将使用 Node.js 和 Express 创建一个完整的 API。

## 为什么选择 Node.js 和 Express？

Node.js 提供了服务器端的 JavaScript 运行时，而 Express 是一个简洁灵活的 Web 应用框架，提供了一整套强大的功能。

## 项目设置

首先，初始化项目并安装依赖：

\`\`\`bash
npm init -y
npm install express mongoose dotenv cors helmet
\`\`\`

## 创建第一个路由

这是一个简单的 GET 路由示例：

\`\`\`javascript
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
\`\`\`

## 中间件和错误处理

正确的错误处理对于生产环境的 API 至关重要。始终使用 try-catch 块并创建自定义错误中间件。

## JWT 认证

实现 JWT 认证来保护你的端点：

\`\`\`javascript
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '30d'
});
\`\`\`

一旦理解了基础知识，使用 Node.js 和 Express 构建 API 就变得非常简单了！`,
        author: adminUser._id
      },
      {
        title: 'CSS Grid vs Flexbox：何时使用哪个？',
        content: `CSS Grid 和 Flexbox 都是强大的布局工具，但知道何时使用哪个可能会令人困惑。让我们来分析一下。

## CSS Flexbox

Flexbox 专为一维布局设计。它非常适合：
- 导航栏
- 横向排列的卡片布局
- 居中元素
- 在项目之间分配空间

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid

Grid 专为二维布局设计。使用它来处理：
- 页面布局
- 复杂的响应式设计
- 图库布局
- 任何需要同时控制行和列的布局

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## 它们可以一起使用吗？

当然可以！Grid 用于整体页面布局，Flexbox 用于 Grid 项目内的组件。

## 浏览器支持

两者在 2024 年都有出色的浏览器支持。在大多数情况下，你可以放心使用它们，无需 polyfills。

理解何时使用每种工具将让你成为更高效的开发者！`,
        author: adminUser._id
      },
      {
        title: 'MongoDB 和 Mongoose 入门',
        content: `MongoDB 是一个流行的 NoSQL 数据库，而 Mongoose 让在 Node.js 应用中使用它变得轻而易举。

## 什么是 MongoDB？

MongoDB 是一个面向文档的 NoSQL 数据库。它不使用表和行，而是使用集合和文档（类似 JSON 的对象）。

## 为什么选择 Mongoose？

Mongoose 提供：
- Schema 验证
- 查询构建器
- 中间件支持
- 类型转换
- 业务逻辑钩子

## 定义 Schema

\`\`\`javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    match: /^\\S+@\\S+\\.\\S+$/
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
\`\`\`

## CRUD 操作

创建文档：
\`\`\`javascript
const user = await User.create({
  username: 'john',
  email: 'john@example.com'
});
\`\`\`

查找文档：
\`\`\`javascript
const users = await User.find({ username: 'john' });
\`\`\`

## Population

Mongoose 最强大的功能之一是能够引用其他集合中的文档：

\`\`\`javascript
const post = await BlogPost.findById(id).populate('author');
\`\`\`

MongoDB 和 Mongoose 一起为现代应用提供了强大而灵活的数据解决方案！`,
        author: adminUser._id
      },
      {
        title: '将全栈应用部署到生产环境',
        content: `你已经构建了应用，现在是时候部署它了！这是部署全栈应用的综合指南。

## 使用 Vercel 部署前端

Vercel 非常适合 React、Next.js 和其他前端框架：

1. 连接你的 GitHub 仓库
2. 配置构建设置
3. 添加环境变量
4. 部署！

\`\`\`bash
npm run build
vercel --prod
\`\`\`

## 使用 Render 部署后端

Render 为 Node.js 应用提供免费托管：

1. 创建新的 Web 服务
2. 连接你的仓库
3. 设置环境变量（MONGO_URI、JWT_SECRET）
4. 配置构建和启动命令

## 使用 MongoDB Atlas 的数据库

MongoDB Atlas 提供免费的云托管 MongoDB：

1. 创建免费集群
2. 设置数据库访问
3. 将 IP 地址加入白名单（或使用 0.0.0.0/0 用于开发）
4. 获取连接字符串

## 环境变量

永远不要提交秘密！在本地使用 .env 文件，在托管平台中配置它们：

\`\`\`
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
\`\`\`

## 保持后端活跃

免费层级在不活动后通常会休眠。使用 UptimeRobot 每 5 分钟 ping 一次你的 API。

## CORS 配置

不要忘记为生产前端 URL 配置 CORS！

\`\`\`javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
\`\`\`

有了这些工具，你可以免费部署专业的全栈应用！`,
        author: adminUser._id
      }
    ]);
    console.log(`✅ ${blogPosts.length} 篇博客文章创建成功`);

    // 4. 创建评论
    console.log('💬 创建评论...');
    const comments = await Comment.create([
      {
        body: '非常实用的教程！Hooks 真的改变了我写 React 的方式。',
        author: adminUser._id,
        post: blogPosts[0]._id
      },
      {
        body: '感谢分享！你能讲讲 useContext 和 useReducer 吗？',
        author: adminUser._id,
        post: blogPosts[0]._id
      },
      {
        body: '这篇 API 教程写得太好了，正是我需要的！',
        author: adminUser._id,
        post: blogPosts[1]._id
      },
      {
        body: 'Grid 和 Flexbox 的对比讲得很清楚，收藏了！',
        author: adminUser._id,
        post: blogPosts[2]._id
      },
      {
        body: 'MongoDB 入门指南很棒，适合新手学习。',
        author: adminUser._id,
        post: blogPosts[3]._id
      }
    ]);
    console.log(`✅ ${comments.length} 条评论创建成功`);

    // 5. 创建联系消息
    console.log('📧 创建联系消息...');
    const messages = await Message.create([
      {
        name: '张小明',
        email: 'zhangxiaoming@example.com',
        message: '你好！看到你的作品集很棒，我们公司正在招聘前端开发，不知道你是否有兴趣？'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        message: 'Hi! I love your portfolio. Would you be interested in a freelance project? We need a React developer for a 3-month contract.'
      },
      {
        name: '李华',
        email: 'lihua@example.com',
        message: '您的博客文章写得非常好！关于 React Hooks 的那篇，我有几个问题想请教。'
      },
      {
        name: 'Mike Chen',
        email: 'mike.chen@techcorp.com',
        message: 'Impressive work on the e-commerce platform! Our team is looking for a full-stack developer. Are you open to full-time opportunities?'
      }
    ]);
    console.log(`✅ ${messages.length} 条联系消息创建成功`);

    console.log('\n🎉 所有测试数据创建完成！\n');
    console.log('📊 数据统计：');
    console.log(`   用户: 1`);
    console.log(`   项目: ${projects.length}`);
    console.log(`   博客: ${blogPosts.length}`);
    console.log(`   评论: ${comments.length}`);
    console.log(`   消息: ${messages.length}`);
    console.log('\n🔑 管理员登录信息：');
    console.log('   用户名: admin');
    console.log('   邮箱: admin@portfolio.com');
    console.log('   密码: admin123');

  } catch (error) {
    console.error('❌ 创建测试数据时出错:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ 数据库连接已关闭');
    process.exit(0);
  }
};

// 运行脚本
seedData();
