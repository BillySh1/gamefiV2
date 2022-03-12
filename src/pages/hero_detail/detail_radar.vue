<template>
  <div id="radar_box" class="c_box">
    <canvas id="radar"></canvas>
  </div>
</template>

<script >
import { reactive, toRefs, onMounted, ref } from "vue";
export default {
  name: "detail_radar",
  props: ["data", "pre"],
  setup(prop) {
    const radar = ref(null);
    const data = reactive({});
    const initCanvas = () => {
      const p_0 = [88, 80, 30, 30, 40];
      const p_1 = [60, 90, 40, 50, 20];
      const p_2 = [40, 40, 90, 50, 60];
      const p_3 = [50, 70, 40, 80, 40];
      const p_4 = [50, 30, 60, 30, 80];
      const p_5 = [90, 90, 90, 90, 90];
      const preferences = [p_0, p_1, p_2, p_3, p_4, p_5];
      const temp = [
        ["血量", preferences[prop.pre][0]],
        ["攻击力", preferences[prop.pre][1]],
        ["计谋", preferences[prop.pre][2]],
        ["暴击", preferences[prop.pre][3]],
        ["防御", preferences[prop.pre][0]],
        ["精神力", preferences[prop.pre][4]],
      ];
      const width = document.getElementById("radar_box").offsetWidth;
      const height = document.getElementById("radar_box").offsetHeight;

      const mW = width;
      const mH = height;
      const mData = temp;
      const mCount = mData.length; //边数
      const mCenter = mW / 2; //中心点
      const mRadius = mCenter - 30; //半径(减去的值用于给绘制的文本留空间)
      const mAngle = (Math.PI * 2) / mCount; //角度
      let mCtx = null;
      const mColorPolygon = "#FFF626"; //多边形颜色
      const mColorLines = "#FFF626"; //顶点连线颜色
      const mColorText = "white";

      const init = () => {
        const canvas = document.getElementById("radar");
        canvas.height = mH;
        canvas.width = mW;
        mCtx = canvas.getContext("2d");
        drawPolygon(mCtx);
        drawLines(mCtx);
        drawText(mCtx);
        drawRegion(mCtx);
        drawCircle(mCtx);
      };
      const drawPolygon = (ctx) => {
        ctx.save();
        ctx.strokeStyle = mColorPolygon;
        var r = mRadius / mCount; //单位半径
        //画6个圈
        for (var i = 0; i < mCount; i++) {
          ctx.beginPath();
          var currR = r * (i + 1); //当前半径
          //画6条边
          for (var j = 0; j < mCount; j++) {
            var x = mCenter + currR * Math.cos(mAngle * j);
            var y = mCenter + currR * Math.sin(mAngle * j);

            ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      };
      const drawLines = (ctx) => {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = mColorLines;

        for (var i = 0; i < mCount; i++) {
          var x = mCenter + mRadius * Math.cos(mAngle * i);
          var y = mCenter + mRadius * Math.sin(mAngle * i);

          ctx.moveTo(mCenter, mCenter);
          ctx.lineTo(x, y);
        }

        ctx.stroke();

        ctx.restore();
      };
      const drawText = (ctx) => {
        ctx.save();

        var fontSize = mCenter / 12;
        ctx.font = fontSize + "px Microsoft Yahei";
        ctx.fillStyle = mColorText;

        for (var i = 0; i < mCount; i++) {
          var x = mCenter + mRadius * Math.cos(mAngle * i);
          var y = mCenter + mRadius * Math.sin(mAngle * i);

          if (mAngle * i >= 0 && mAngle * i <= Math.PI / 2) {
            ctx.fillText(mData[i][0], x, y + fontSize);
          } else if (mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI) {
            ctx.fillText(
              mData[i][0],
              x - ctx.measureText(mData[i][0]).width,
              y + fontSize
            );
          } else if (mAngle * i > Math.PI && mAngle * i <= (Math.PI * 3) / 2) {
            ctx.fillText(
              mData[i][0],
              x - ctx.measureText(mData[i][0]).width,
              y
            );
          } else {
            ctx.fillText(mData[i][0], x, y);
          }
        }

        ctx.restore();
      };
      const drawRegion = (ctx) => {
        ctx.save();

        ctx.beginPath();
        for (var i = 0; i < mCount; i++) {
          var x =
            mCenter + (mRadius * Math.cos(mAngle * i) * mData[i][1]) / 100;
          var y =
            mCenter + (mRadius * Math.sin(mAngle * i) * mData[i][1]) / 100;

          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(217,134,10,0.7)";
        ctx.fill();

        ctx.restore();
      };
      const drawCircle = (ctx) => {
        ctx.save();

        var r = mCenter / 30;
        for (var i = 0; i < mCount; i++) {
          var x =
            mCenter + (mRadius * Math.cos(mAngle * i) * mData[i][1]) / 100;
          var y =
            mCenter + (mRadius * Math.sin(mAngle * i) * mData[i][1]) / 100;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
          ctx.fill();
        }

        ctx.restore();
      };

      init();
    };
    onMounted(() => {
      initCanvas();
      window.addEventListener("resize", initCanvas);
    });

    const refData = toRefs(data);
    return {
      ...refData,
      radar,
    };
  },
};
</script>
<style lang='less' scoped>
.c_box {
  width: 100%;
  height: 100%;
}
</style>