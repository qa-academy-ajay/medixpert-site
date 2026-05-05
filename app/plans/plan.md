 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                // onClick={() => setSelectedPlan(plan.id)}
                className={`rounded-2xl p-6 border relative cursor-pointer transition-all duration-200 ${isSelected
                  ? "border-emerald-500 bg-emerald-900 text-white shadow-lg scale-[1.02]"
                  : plan.popular
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-gray-200 bg-white hover:border-emerald-200 hover:shadow-sm"
                  }`}
              >
                {/* Badges */}
                {plan.popular && !isSelected && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                {isSelected && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                    ✓ Selected
                  </span>
                )}

                {/* Content */}
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isSelected ? "text-emerald-300" : "text-gray-400"
                  }`}>
                  {plan.label}
                </p>

                <p className={`text-4xl font-extrabold mb-0.5 ${isSelected ? "text-white" : "text-gray-900"
                  }`}>
                  {plan.days}
                  <span className={`text-base font-medium ml-1 ${isSelected ? "text-emerald-300" : "text-gray-400"
                    }`}>
                    days
                  </span>
                </p>

                <p className={`text-2xl font-bold mb-3 ${isSelected ? "text-emerald-200" : "text-emerald-700"
                  }`}>
                  ₹{plan.price}
                </p>

                <p className={`text-xs mb-5 leading-relaxed ${isSelected ? "text-emerald-100" : "text-gray-500"
                  }`}>
                  {plan.desc}
                </p>

                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-xs ${isSelected ? "text-emerald-100" : "text-gray-600"
                        }`}
                    >
                      <span className={`text-base ${isSelected ? "text-emerald-300" : "text-emerald-500"
                        }`}>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>























        {/* Plans Grid (Read Only) */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {plans.map((plan) => (
    <div
      key={plan.id}
      className={`rounded-2xl p-6 border relative ${
        plan.popular
          ? "border-emerald-300 bg-emerald-50"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      {/* Content */}
      <p className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">
        {plan.label}
      </p>

      <p className="text-4xl font-extrabold mb-0.5 text-gray-900">
        {plan.days}
        <span className="text-base font-medium ml-1 text-gray-400">
          days
        </span>
      </p>

      <p className="text-2xl font-bold mb-3 text-emerald-700">
        ₹{plan.price}
      </p>

      <p className="text-xs mb-5 leading-relaxed text-gray-500">
        {plan.desc}
      </p>

      <ul className="space-y-1.5">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-xs text-gray-600"
          >
            <span className="text-base text-emerald-500">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>





<div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            Subscription Plans
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Pick your wellness journey
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            All plans include fresh daily juice delivery at just ₹50/day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { days: 7, label: "Starter", price: 350, desc: "Great for first-timers to experience the benefits.", popular: false },
            { days: 15, label: "Wellness", price: 750, desc: "Our most popular plan for noticeable health improvement.", popular: true },
            { days: 30, label: "Transform", price: 1500, desc: "Full Ayurvedic therapy cycle for lasting results.", popular: false },
          ].map((plan) => (
            <div
              key={plan.days}
              className={`rounded-2xl p-6 border ${plan.popular
                ? "border-emerald-500 bg-emerald-900 text-white"
                : "border-gray-200 bg-white text-gray-900"
                } relative`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>
                {plan.label}
              </p>
              <p className="text-4xl font-extrabold mb-1">
                {plan.days}<span className={`text-base font-medium ml-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>days</span>
              </p>
              <p className={`text-2xl font-bold mb-4 ${plan.popular ? "text-emerald-200" : "text-emerald-700"}`}>
                ₹{plan.price}
              </p>
              <p className={`text-sm mb-6 leading-relaxed ${plan.popular ? "text-emerald-100" : "text-gray-500"}`}>
                {plan.desc}
              </p>
              <Link
                href="/plans"
                className={`block text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${plan.popular
                  ? "bg-white text-emerald-900 hover:bg-emerald-50"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
              >
                Subscribe — ₹{plan.price}
              </Link>
            </div>
          ))}
        </div>  












