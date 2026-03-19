import styles from "./index.less";
import bg from "@/assets/bg.jpg";

export default () => {
  return (
    <div>
      <h1>css 新属性</h1>
      <div className={styles.caretColor}>
        <p>光标颜色</p>
        <input
          placeholder="请输入"
          type="text"
          maxLength={20}
          style={{ caretColor: "red" }}
        />
      </div>
      <div>
        <p>checkbox</p>
        <input type="checkbox" />
        <input type="checkbox" style={{ accentColor: "red" }} />
        <input type="checkbox" style={{ accentColor: "goldenrod" }} />
      </div>
      <div>
        <p style={{ userSelect: "none" }}>文本禁止选中</p>
        <p style={{ userSelect: "none" }}>
          文本<span style={{ textEmphasis: "filled circle red" }}>强调</span>
          符号
        </p>
      </div>
      <div>
        <p style={{ hyphens: "auto" }}>
          Unit 8 Guidebook Explore grammar tips and key phrases for this unit
          Unit 8 Guidebook Explore grammar tips and key phrases for this unit
          Unit 8 Guidebook Explore grammar tips and key phrases for this unit
        </p>
      </div>
      <div>
        <p>flex布局 gap,图片填充效果，灰度滤镜</p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            width: 1260,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <p
              key={i}
              style={{
                width: 300,
                aspectRatio: 16 / 9,
                border: "solid 1px #999",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              {i}
              <img
                className={styles.img}
                src={bg}
                style={{ objectFit: "cover" }}
              />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
