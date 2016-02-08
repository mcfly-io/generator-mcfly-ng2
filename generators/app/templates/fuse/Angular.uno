using Uno;
using Uno.Collections;
using Fuse;
using Fuse.Scripting;
using Fuse.Reactive;

//namespace Fuse.Angular {

public class Angular: Fuse.Controls.Panel {

	static bool isInitialized = false;

	public Angular() {
		if (!isInitialized) {
			isInitialized = true;
			var common = new JavaScript() {
				File = new global::Uno.UX.BundleFileSource(import global::Uno.BundleFile("../dist/<%=targetname%>/dev/common.js"))
			};
			global::Uno.UX.Resource.SetGlobalKey(common, "common");
			var vendor = new JavaScript() {
				File = new global::Uno.UX.BundleFileSource(import global::Uno.BundleFile("../dist/<%=targetname%>/dev/vendor.js"))
			};
			global::Uno.UX.Resource.SetGlobalKey(vendor, "vendor");
			var bundle = new JavaScript() {
				File = new global::Uno.UX.BundleFileSource(import global::Uno.BundleFile("../dist/<%=targetname%>/dev/bundle.js"))
			};
			global::Uno.UX.Resource.SetGlobalKey(bundle, "bundle");
			var AngularRenderer = new JavaScript() {
				File = new global::Uno.UX.BundleFileSource(import global::Uno.BundleFile("AngularRenderer.js"))
			};
			global::Uno.UX.Resource.SetGlobalKey(AngularRenderer, "AngularRenderer");
		}
		var AngularBootstrap = new JavaScript() {
			File = new global::Uno.UX.BundleFileSource(import global::Uno.BundleFile("AngularBootstrap.js"))
		};
		Behaviors.Add(AngularBootstrap);
	}
}
//}
