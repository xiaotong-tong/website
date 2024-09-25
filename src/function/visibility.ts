let originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "hidden") {
		originalTitle = document.title;
		document.title = "ヾ(´〇｀)ﾉ♪♪♪ いってらっしゃい！";
	} else {
		document.title = "(⸝⸝•‧̫•⸝⸝) おかえり！";
		setTimeout(() => {
			document.title = originalTitle;
		}, 2000);
	}
});
